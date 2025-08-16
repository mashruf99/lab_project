# Free Speech: A Social Media Platform 

"Free Speech" is a lightweight, modern social media application inspired by platforms like Instagram. This project was built as an educational tool to understand and implement the core functionalities of a visual-content-based social platform, from user authentication to interactive feeds.

##  About The Project

While major social media platforms are powerful, their closed-source and complex nature makes it difficult for developers to learn how they work[cite: 29]. This project aims to bridge that gap by offering a simplified, functional clone that demonstrates key features using a modern tech stack.

The application allows users to register, create posts with images or videos, and interact with other users through likes, comments, and a follow system[cite: 36, 37, 39]. The user feed is personalized and features infinite scrolling for a seamless browsing experience[cite: 40, 41].

## 的核心功能 (Core Features)

* **User Authentication**: Secure sign-up, log-in, and session management powered by Appwrite[cite: 82].
* **Profile Management**: Users can create and edit their profiles, including updating their bio and profile picture[cite: 83].
* **Content Posting**: Create posts with captions, requiring an image or video upload[cite: 84].
* **Personalized Feed**: The home feed displays the latest posts from users you follow[cite: 85].
* **User Interaction**: Like posts, leave comments, and follow or unfollow other users to customize your feed[cite: 86, 87].
* **Infinite Scrolling**: The feed automatically loads more posts as you scroll down, ensuring a smooth user experience[cite: 87].
* **Responsive UI**: A clean, modern, and fully responsive interface built with Tailwind CSS and shadcn/ui[cite: 88].

## 🛠️ Tech Stack

The project leverages a modern, scalable tech stack for both the frontend and backend.

### Frontend
* **React.js** [cite: 92]
* **TypeScript** [cite: 93]
* **Vite** [cite: 102]
* **Tailwind CSS** [cite: 94]
* **shadcn/ui** [cite: 95]

### Backend (BaaS)
* **Appwrite**: Used for all backend services[cite: 97].
    * **Authentication**: Manages user sign-up, login, and sessions[cite: 98].
    * **Database**: Stores data for users, posts, comments, and likes[cite: 99].
    * **Storage**: Handles all image and video file uploads[cite: 100].

## Limitations

As this project was developed using the free tier of Appwrite, it does not include:
* An Admin Dashboard or moderation features.
* A direct messaging or chat system.

##  Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* An Appwrite instance (cloud or self-hosted)

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your_username/free-speech.git](https://github.com/your_username/free-speech.git)
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Set up environment variables**

    Create a `.env.local` file in the root of the project and add your Appwrite credentials:

    ```
    VITE_APPWRITE_PROJECT_ID=your_project_id
    VITE_APPWRITE_URL=your_appwrite_url
    VITE_APPWRITE_DATABASE_ID=your_database_id
    VITE_APPWRITE_STORAGE_ID=your_storage_id
    # ... any other collection IDs
    ```

4.  **Run the development server**
    ```sh
    npm run dev
    ```