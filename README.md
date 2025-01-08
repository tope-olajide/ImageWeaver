# Image Weaver - Frontend Setup

## Game Overview

**Image Weaver** is an engaging word puzzle game where players analyze a picture containing **four collages** and use **12 letter buttons** to form the correct word that represents the image.


## Prerequisites
Before running the frontend, sign up for the required Azure services and obtain the following credentials:

- `EXPO_PUBLIC_CLIENT_ID`
- `EXPO_PUBLIC_TENANT_ID`
- `EXPO_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME`
- `EXPO_PUBLIC_AZURE_STORAGE_SAS_TOKEN`
- `EXPO_PUBLIC_AZURE_STORAGE_ACCOUNT_URL`
- `EXPO_PUBLIC_AZURE_STORAGE_CONTAINER_NAME`

## Setup Instructions

### Step 1: Install Dependencies

Run the following command to install all required dependencies:

```sh
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root of your project and add the following:

```sh
EXPO_PUBLIC_CLIENT_ID=
EXPO_PUBLIC_TENANT_ID=
EXPO_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME=
EXPO_PUBLIC_AZURE_STORAGE_SAS_TOKEN=
EXPO_PUBLIC_AZURE_STORAGE_ACCOUNT_URL=
EXPO_PUBLIC_AZURE_STORAGE_CONTAINER_NAME=
```

Replace the empty values with your actual credentials.

### Step 3: Start the Development Server

Run the following command to start the server:

```sh
npx expo dev
```

Your frontend should now be running and accessible through the Expo development environment.

## License
This project is licensed under the terms defined in the `LICENSE.md` file.

