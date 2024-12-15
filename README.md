# EBOX
![image](https://github.com/user-attachments/assets/96338151-cd5a-4b68-a586-8a806b243d0f)

## Overview
EBOX is a modern auction platform designed to connect buyers and sellers in a seamless bidding experience. Users can create listings, bid on items, and manage their credits, all through a clean and intuitive interface.  

This project represents the front-end application for an auction site using the Noroff API.

## Description
EBOX allows users to register with a `stud.noroff.no` email, log in, and participate in auctions by listing items for bidding or placing bids on available listings. Non-registered users can browse and search listings but require an account to engage fully.  

The platform provides the following features:
- Initial credits for new users to kickstart their auction journey.
- Ability to create detailed item listings with titles, descriptions, images, and bid deadlines.
- A streamlined interface for tracking bids and credits.

EBOX emphasizes accessibility and responsiveness, making it user-friendly across devices.

## Features
### User Authentication
- Register using a `stud.noroff.no` email.
- Secure login and logout functionality.
- Encrypted user session placed inside cookies.
- Optimistic auth check in middleware.
- Automatically updates user session in middleware.

### Data Access Layer (DAL)
- Auth check before running server actions.
- Automatic redirects to '/login' for unauthorized users.
- Prevents sensitive data from leaking to client

### Profile Management
- Update profile avatars.
- Update profile bio.
- View and track total credits.
- View and search through active-/inactive-listings/wins/bids

### Listings
- Create detailed item listings with:
  - Title
  - Description
  - Media gallery
  - Deadline date
- Search functionality for listings (available to all users).

### Cache
- All fetches are cached with their own pre-defined cache-tag.
- Automatic revalidation for all relevant cache-tags when a user action is called or when a listing ends.

### Bidding
- Registered users can bid on available listings.
- Track bids and view bid history for each item.

### Feed
- Real-time display of active listings and bidding updates.

## Built With
- **Framework**: [Next.js 15.0.3](https://nextjs.org/)
- **Typescript**: [Typescript^5](https://www.typescriptlang.org/)
- **Zod**: [Zod^3.23.8](https://zod.dev/)
- **UI Components**: [Shadcn ui](https://ui.shadcn.com/)
- **CSS Framework**: [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- **Hosting Service**: [Vercel](https://vercel.com/)
- **Design Tools**: Photoshop, Figma
- **Planning Tool**: Notion

## Getting Started
### Installing
To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Motormary/semester-project-2
   ```

2. Navigate to the project directory:

   ```bash
   cd semester-project-2
   ```

3. Install dependencies

   ```bash
    pnpm install
   ```

4. Rename the '.env.example' file inside the root oflder to '.env'

5. Create an API key and replace the API_KEY value inside .env:

    Follow the Noroff docs: [Noroff docs](https://docs.noroff.dev/docs/v2/auth/api-key)

6. Pusher notifications:
    1. Create a Pusher account:
    - [Pusher.com](https://pusher.com/)
    - Choose a 'channels' sandbox plan (free tier)
    - Navigate to the 'app keys' tab in the sidebar
    - Replace the id/key/secret placeholders inside the .env with your own

    2. If notifications are not desired:
       - Delete pusher-.ts/tsx from the lib folder
       - Delete the 'pusher-auth' route handler inside '/app/api'
       - Remove the Pusher component from the navbar 'nav-menu.tsx'
       - Remove the pusherServer function inside 'bid.ts' under '/app/actions/listings'

## Running
To run the project locally:
1. Start the development server:
    ```bash
    pnpm dev
    ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000).

## Additional Resources

Here are the project links requested by the Product Owner:
    - Gantt Chart for Project Timing: [Gantt Chart](https://spectacular-globe-df5.notion.site/13d43f36b82a8086ba25ea5d04d814d6?v=13d43f36b82a81bc8909000c5e2cc8cd)
    - Kanban Project Board: [Notion Board](https://spectacular-globe-df5.notion.site/13d43f36b82a8086ba25ea5d04d814d6?v=13d43f36b82a818daa3d000c9c2410f6)
    - Design Prototype & Style Guide: [Figma Prototype](https://www.figma.com/design/NttInHcuHz0lf4nvrCjjsk/Semester-Project-2?node-id=102-323&t=LIAxDqt7ecHS7LBP-1)
    - Hosted Application Demo: [EBOX Demo](https://semester-project-2-one.vercel.app/)
