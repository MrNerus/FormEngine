# Form Engine

## Overview

This project is a dynamic and interactive form engine built with the latest features of Angular. It is designed to be a showcase of modern Angular development, including standalone components, signals for state management, and a reactive forms approach. The form includes various input types and demonstrates advanced features like conditional fields, image uploads with progress indicators, and robust error handling.

## Project Structure

The application is organized into the following key files:

- **`app.component.ts`**: The root component that bootstraps the application.
- **`form/form.ts`**: The main component that defines the form's structure, logic, and interactivity.
- **`form/form.html`**: The template for the form, using native control flow and data binding.
- **`form/form.css`**: The stylesheet for the form, with a modern and clean design.
- **`services/image-upload.service.ts`**: A service for handling image uploads, with progress simulation.
- **`services/mock-backend.ts`**: A mock backend service to simulate API responses for image uploads.
- **`blueprint.md`**: This file, which outlines the project's features and development plan.

## Implemented Features

### Phase 1: Basic Form Structure

- **Objective**: Create the initial form layout with a variety of input types, including text, date, toggle, and slider.
- **Key Achievements**:
    - A `FormComponent` was created with a reactive form group.
    - The template was built with standard HTML form elements.
    - Basic styling was applied for a clean and user-friendly interface.

### Phase 2: Conditional Logic

- **Objective**: Implement a conditional field that appears only when a toggle is active.
- **Key Achievements**:
    - The `@if` native control flow was used to conditionally render the input field.
    - The form's state was managed with signals to ensure reactivity.

### Phase 3: Image Previews

- **Objective**: Add the ability to preview selected images before uploading.
- **Key Achievements**:
    - `onFileSelected` and `onMultipleFilesSelected` methods were implemented to handle file inputs.
    - Signals were used to store and display image preview URLs.
    - The template was updated to render the selected images.

### Phase 4: Upload Progress

- **Objective**: Provide visual feedback during image uploads with progress bars.
- **Key Achievements**:
    - The `ImageUploadService` was enhanced to simulate upload progress with an `Observable`.
    - The `FormComponent` was updated to track the progress of each upload.
    - Progress bars were added to the template, dynamically updating based on the upload status.

### Phase 5: Error Handling

- **Objective**: Implement robust error handling to inform the user of any upload failures.
- **Key Achievements**:
    - The mock backend was modified to simulate random upload failures.
    - The `FormComponent` now catches and stores error messages.
    - Error messages are displayed in the template to provide clear feedback to the user.
