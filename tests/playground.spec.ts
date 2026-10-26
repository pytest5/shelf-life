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

test('challenge 8', async ({ page }) => {
	await goToPlayground(page);
	await expect(page.getByLabel('Author')).toBeVisible(); // 'Author' input field exists, is labelled and is visible
	await expect(page.getByLabel('Author')).toHaveAccessibleDescription('Last name, first name'); // check 'Author' input field is connected to hint via "aria-describedby"
	await expect(page.getByText('Last name, first name')).toBeVisible(); // check that hint is visible
});

test('challenge 9', async ({ page }) => {
	await goToPlayground(page);
	await expect(page.getByRole('paragraph').filter({ hasText: '42 days.' })).toBeVisible();
});

test('challenge 10', async ({ page }) => {
	await goToPlayground(page);
	await expect(page.getByText('3 of 12 books finished', { exact: true })).toBeVisible();
});

test('challenge 11', async ({ page }) => {
	await goToPlayground(page);
	await expect(
		page.getByRole('paragraph').filter({ hasText: 'You have 4 books on your shelf right now' })
	).toBeVisible();
});

test('challenge 12', async ({ page }) => {
	await goToPlayground(page);
	await expect(
		page
			.getByRole('table', { name: 'Book ratings' })
			.getByRole('row')
			.filter({ hasNot: page.getByRole('columnheader') })
	).toHaveCount(3);
});

test('challenge 13', async ({ page }) => {
	await goToPlayground(page);
	await expect(page.getByRole('list', { name: 'Reading list' }).getByRole('listitem')).toHaveCount(
		4
	);
});

test('challenge 14', async ({ page }) => {
	await goToPlayground(page);
	const stationElevenLocator = page.getByText(
		'Station Eleven is a post-apocalyptic novel by Emily St. John Mandel, published in 2014'
	);
	await expect(stationElevenLocator).toBeHidden();
	await page.getByRole('button', { name: 'Show details' }).click();
	await expect(stationElevenLocator).toBeVisible();
});

test('challenge 15', async ({ page }) => {
	await goToPlayground(page);

	const loadMoreButton = page.getByRole('button', { name: 'Load more' });
	const loadingButton = page.getByRole('button', { name: 'Loading...' });

	await expect(page.getByRole('list', { name: 'Newly loaded books' })).toBeHidden();
	await loadMoreButton.click();
	await expect(loadingButton).toBeVisible();
	await expect(loadingButton).toBeDisabled();
	await expect(
		page.getByRole('list', { name: 'Newly loaded books' }).getByRole('listitem')
	).toHaveCount(2);
	await expect(loadMoreButton).toBeVisible();
	await expect(loadMoreButton).toBeEnabled();
});

test('challenge 16', async ({ page }) => {
	await goToPlayground(page);

	const loadingText = page.getByText('Loading...');
	const loadedText = page.getByText('Content loaded');

	await expect(loadingText).toBeVisible();
	await expect(loadingText).toBeHidden();
	await expect(loadedText).toBeVisible();
});

test('challenge 17', async ({ page }) => {
	await goToPlayground(page);

	const rateThisBookButton = page.getByRole('button', { name: 'Rate this book' }).last();
	await rateThisBookButton.click();

	const rateThisBookDialog = page.getByRole('dialog');
	await expect(rateThisBookDialog).toBeVisible();
});

test('challenge 18', async ({ page }) => {
	await goToPlayground(page);

	const rateThisBookButton = page.getByRole('button', { name: 'Rate this book' }).last();
	await rateThisBookButton.click();

	const rateThisBookDialog = page.getByRole('dialog');
	await expect(rateThisBookDialog).toBeVisible();

	const fourStarsRadio = rateThisBookDialog.getByRole('radio', { name: '4 stars' });
	// await expect(fourStarsRadio).toBeVisible(); // not needed click() does this for you
	await fourStarsRadio.click();
	await expect(fourStarsRadio).toBeChecked();

	const saveRatingButton = rateThisBookDialog.getByRole('button', { name: 'Save rating' });
	// await expect(saveRatingButton).toBeVisible(); // not needed click() does this for you
	// await expect(saveRatingButton).toBeEnabled(); // not needed click() does this for you
	await saveRatingButton.click();

	await expect(rateThisBookDialog).toBeHidden();
});

test('challenge 19', async ({ page }) => {
	await goToPlayground(page);

	const rateThisBookButton = page.getByRole('button', { name: 'Rate this book' }).last();
	await rateThisBookButton.click();

	const rateThisBookDialog = page.getByRole('dialog');
	await expect(rateThisBookDialog).toBeVisible();

	const cancelButton = rateThisBookDialog.getByRole('button', { name: 'Cancel' });
	await cancelButton.click();

	await expect(rateThisBookDialog).toBeHidden();
});

test('challenge 20', async ({ page }) => {
	await goToPlayground(page);
	const unsavedChangesBanner = page.getByRole('alert');
	await expect(unsavedChangesBanner).toContainText('Unsaved changes will be lost');
});

test('challenge 21', async ({ page }) => {
	await goToPlayground(page);

	const progressBar = page.getByRole('progressbar', { name: 'Reading progress' });
	await expect(progressBar).toHaveAttribute('aria-valuenow', '65');
});

test('challenge 22', async ({ page }) => {
	await goToPlayground(page);

	const panelContents = page.getByText('This panel is controlled by the toggle button above');
	const togglePanelButton = page.getByRole('button', { name: 'Toggle panel' });

	await expect(panelContents).toBeHidden();
	await expect(togglePanelButton).toHaveAttribute('aria-expanded', 'false');
	await togglePanelButton.click();
	await expect(togglePanelButton).toHaveAttribute('aria-expanded', 'true');

	await expect(panelContents).toBeVisible();
});
