import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { CoreModule } from '@/src/core/core.module';

describe('Colors (e2e)', () => {
	let app: INestApplication;
	let createdColorId: string;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [CoreModule]
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a color via GraphQL mutation', async () => {
		const createInput = {
			name: 'RedBull',
			hex: '#FF0000',
			rgb: 'rgb(255, 0, 0)'
		};

		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: `
          mutation CreateColor($data: CreateColorInput!) {
            createColor(data: $data)
          }
        `,
				variables: {
					data: createInput
				}
			});

		expect(response.status).toBe(200);
		expect(response.body.data.createColor).toBe(true);

		const allColorsResponse = await request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: `{
          findAllColors {
            id
            name
          }
        }`
			});

		createdColorId = allColorsResponse.body.data.findAllColors[0].id;
	});

	it('should get all colors via GraphQL query', async () => {
		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: `{
          findAllColors {
            id
            name
            hex
            rgb
          }
        }`
			});

		expect(response.status).toBe(200);
		expect(response.body.data.findAllColors).toBeInstanceOf(Array);
		expect(response.body.data.findAllColors.length).toBeGreaterThan(0);
	});

	it('should find color by name via GraphQL query', async () => {
		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: `
          query FindColorByName($name: String!) {
            findColorByName(name: $name) {
              id
              name
              hex
              rgb
            }
          }
        `,
				variables: {
					name: 'RedBull'
				}
			});

		expect(response.status).toBe(200);
		expect(response.body.data.findColorByName).toBeDefined();
		expect(response.body.data.findColorByName.name).toBe('RedBull');
	});

	it('should update color via GraphQL mutation', async () => {
		const updateInput = {
			name: 'Updated RedBull',
			hex: '#FF0001',
			rgb: 'rgb(255,0,1)'
		};

		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: `
          mutation UpdateColor($id: String!, $data: ChangeColorInput!) {
            updateColor(id: $id, data: $data)
          }
        `,
				variables: {
					id: createdColorId,
					data: updateInput
				}
			});

		if (response.status !== 200) {
			console.error('Update Error:', response.body.errors);
		}

		expect(response.status).toBe(200);
		expect(response.body.data.updateColor).toBe(true);
	});

	it('should delete color via GraphQL mutation', async () => {
		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: `
          mutation RemoveColor($id: String!) {
            removeColor(id: $id)
          }
        `,
				variables: {
					id: createdColorId
				}
			});

		if (response.status !== 200) {
			console.error('Delete Error:', response.body.errors);
		}

		expect(response.status).toBe(200);
		expect(response.body.data.removeColor).toBe(true);
	});
});
