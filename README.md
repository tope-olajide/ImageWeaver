# Image Weaver - Frontend Setup

## Game Overview

**Image Weaver** is an engaging word puzzle game where players analyze a picture containing **four collages** and use **12 letter buttons** to form the correct word that represents the image.

Before setting up the game, **you must get the backend working first** to ensure proper functionality.  

### ** Set Up the Backend**  
Follow the instructions in the backend repository to get it running:  
🔗 **[Image Weaver Backend Setup](https://github.com/tope-olajide/ImageWeaver-functions)**  

---

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


## Setting Up Game and Tournament Quests  

To properly configure the game, you need to create two new files inside the `app` folder:  

1. **gameQuests.ts** – This file contains the word challenges for the main game.  
2. **tournamentQuests.ts** – This file contains the word challenges for tournament mode.  

### **Steps to Add the Files:**  
1. Navigate to the `app` folder in your project.  
2. Create a new file named **`gameQuests.ts`** and add the following content:  

```typescript
const gameQuests = [
  {
    word: "match",
    imageURL: "match.webp",
    hint: "Strike to light a fire.",
  },
  {
    word: "wrestler",
    imageURL: "wrestler.webp",
    hint: "An athlete who competes in wrestling.",
  },
  {
    word: "falls",
    imageURL: "falls.webp",
    hint: "Rapid descents, such as waterfalls or sudden drops.",
  },
];

export default gameQuests;
```

3. Create another file named **`tournamentQuests.ts`** and add the following content:  

```typescript
const tournamentQuests = [
  {
    word: "ascend",
    imageURL: "ascend.webp",
    hint: "Go upwards, like climbing a mountain.",
  },
  {
    word: "gather",
    imageURL: "gather.webp",
    hint: "Collect things together in one place.",
  },
  {
    word: "blaze",
    imageURL: "blaze.webp",
    hint: "A large, bright fire.",
  },
];

export default tournamentQuests;
```

4. **Save both files.**  
5. The **gameQuests.ts** file will be used for the main game, while the **tournamentQuests.ts** file will be loaded for tournament mode.  

 

Your frontend should now be running and accessible through the Expo development environment.

## License
This project is licensed under the terms defined in the `LICENSE.md` file.

