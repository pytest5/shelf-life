import test, { expect, type Page } from '@playwright/test';

const goToPlayground = async (page: Page) => {
	await page.goto('/playground');
	await expect(page).toHaveURL('/playground');
};

test('challenge 1', async ({ page }) => {
	await goToPlayground(page);
	const addToShelfButton = await page.getByRole('button', { name: 'Add to shelf' });
	await expect(addToShelfButton).toBeVisible();
});

test('challenge 2', async ({ page }) => {
	await goToPlayground(page);
	const button = await page.getByRole('button', { name: 'Cancel' });
	await expect(button).toBeVisible();
});

test('challenge 3', async ({ page }) => {
	await goToPlayground(page);
	const button = await page.getByRole('button', { name: 'Out of stock' });
	await expect(button).toBeVisible();
	await expect(button).toBeDisabled();
});

test('challenge 4', async ({ page }) => {
	await goToPlayground(page);
	const searchInput = await page.getByLabel('Search');
	await expect(searchInput).toBeVisible();
});

test('challenge 5', async ({ page }) => {
	await goToPlayground(page);
	const deleteButtonLocator = page.getByRole('button', { name: 'Delete' }).first();
	await expect(deleteButtonLocator).toBeVisible();
});

test('challenge 6', async ({ page }) => {
	await goToPlayground(page);
	await expect(
		page
			.getByRole('list', { name: 'Reading list' })
			.getByRole('listitem')
			.nth(2)
			.getByRole('button', { name: 'Remove' })
	).toBeVisible();
});

test('challenge 7', async ({ page }) => {
	await goToPlayground(page);
	await expect(
		page
			.getByRole('article', { name: 'Piranesi by Susanna Clarke' })
			.getByRole('button', { name: 'Rate this book' })
	).toBeVisible();
});
