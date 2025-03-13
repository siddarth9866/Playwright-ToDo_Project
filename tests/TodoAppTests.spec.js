import { test, expect } from '@playwright/test';

test.describe('To-Do App Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8081/'); // Update with your app's URL
    });

    test('should add a new task', async ({ page }) => {
        await page.fill('//input[@placeholder="Add a new Todo"]', 'Buy groceries');
        await page.click('//*[@id="root"]/div/div[2]/div/div');
        await expect(page.locator('//*[@id="root"]/div/div[3]/div/div/div/div[1]')).toBeVisible();
        await page.waitForTimeout(2000);
    });

    test('should edit an existing task', async ({ page }) => {
        await page.fill('//input[@placeholder="Add a new Todo"]', 'Go jogging');
        await page.click('text=Add');
        
        await expect(page.locator('text=Go jogging')).toBeVisible();

        await page.waitForTimeout(4000);
    });
    test('should edit a todo', async ({ page }) => {
        // Add a todo first
        await page.fill('input[placeholder="Add a new Todo"]', 'Go jogging');
        await page.click('text=Add');

        await expect(page.locator('text=Go jogging')).toBeVisible();
        
        const editButton = page.locator('text=Edit');
        await expect(editButton).toBeVisible();
        await editButton.click();
        
        const todoInput = page.locator('//*[@id="root"]/div/div[3]/div/div/div/input');
        await expect(todoInput).toBeVisible();

        await todoInput.fill('Go running');

        const saveButton = page.locator('text=Save');
        await expect(saveButton).toBeVisible();
        await saveButton.click();
        
        await expect(page.locator('text=Go running')).toBeVisible();
        await expect(page.locator('text=Go jogging')).not.toBeVisible();
    });
    
    test('should delete a todo', async ({ page }) => {
        
        // Add a todo first
        await page.fill('input[placeholder="Add a new Todo"]', 'Go jogging');
        await page.click('text=Add');
        
        // Click Delete button
        await page.click('text=Delete');
        
        // Verify the todo is deleted
        await expect(page.locator('text=Go jogging')).not.toBeVisible();
    });
});
