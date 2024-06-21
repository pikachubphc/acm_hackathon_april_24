This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Bits UI: Mental Health Support App

## Project Overview

**Project Name:** Bits AI

**Target Audience:** Students and faculty of BITS Pilani Hyderabad Campus

**Objective:** Bits UI aims to provide a safe and supportive platform for users to discuss their mental health concerns. The app facilitates open communication, offers resources for mental wellness, and connects users with professional help when needed.

**Primary Technologies:**
- **Frontend:** Next.js
- **Backend:** Supabase
- **AI Model used:** Claude Sonnet (by Anthropic)

## Features

### 1. User Authentication
- Secure sign-up and login using email and password.
- Integration with BITS Pilani's single sign-on (SSO) for seamless access.

### 2. Professional Support
- Users can book appointments with mental health professionals through the app.
- Secure and confidential chat feature for consultations.

### 3. Resource Library
- A curated library of articles, videos, and other resources on mental health and wellness.
- Regular updates with new content relevant to the campus community.

### 4. Notifications
- Push notifications to keep users informed about new posts, responses, and upcoming events or sessions.

### 5. User Profiles
- Personalized user profiles to track mental health progress and access previous posts and resources.
- Option to remain anonymous or use a pseudonym in the community.

## Technology Stack

### Frontend: Next.js
- **React Framework:** Provides a robust foundation for building a highly responsive user interface.
- **Server-Side Rendering (SSR):** Ensures fast load times and optimal performance.
- **Static Site Generation (SSG):** Enhances the app's SEO and pre-renders pages at build time.

### Backend: Supabase
- **PostgreSQL Database:** Reliable and scalable database solution for storing user data and forum posts.
- **Authentication:** Built-in user authentication to manage user sessions securely.
- **Real-time Subscriptions:** Real-time updates for forums and chat features, ensuring users receive the latest information instantly.
- **APIs:** Easy-to-use APIs for seamless integration with the frontend.

### AI Models: Claude
- **Natural Language Processing:** Utilized for analyzing user posts and providing AI-based mental health assessments and recommendations.
- **Sentiment Analysis:** Helps in understanding the emotional tone of user posts to offer appropriate responses and resources.

## Problems Faced

### 1. User Privacy Concerns
- **Issue:** Ensuring user anonymity while maintaining the integrity of the platform was challenging.
- **Solution:** Implemented robust encryption and allowed anonymous posting to protect user identities.

### 2. Integration with Existing Systems
- **Issue:** Integrating with BITS Pilani's SSO and other existing systems required detailed coordination and custom development.
- **Solution:** Worked closely with the campus IT department to ensure seamless integration.

### 3. Real-time Updates and Scalability
- **Issue:** Ensuring real-time updates for forums and chats while maintaining scalability.
- **Solution:** Leveraged Supabase's real-time subscriptions and optimized database queries to handle high traffic efficiently.

### 4. Content Moderation
- **Issue:** Managing and moderating user-generated content to prevent misuse of the platform.
- **Solution:** Implemented AI-based moderation tools using Claude APIs to detect and flag inappropriate content.

### 5. User Engagement
- **Issue:** Encouraging active participation and regular use of the app.
- **Solution:** Introduced gamification elements and regular updates to keep the content fresh and engaging.

## Implementation Plan

### Phase 1: Project Setup
- Set up Next.js and Supabase projects.
- Configure Supabase database and authentication.

### Phase 2: User Authentication and Profile Management
- Implement user sign-up and login functionality.
- Create user profile pages.

### Phase 3: Forum and Discussion Features
- Develop the forum structure and create categories.
- Enable anonymous posting and user interaction in forums.

### Phase 4: Professional Support Integration
- Set up appointment booking system with mental health professionals.
- Implement secure chat feature for confidential consultations.

### Phase 5: Resource Library
- Curate and upload mental health resources.
- Design user interface for easy access and navigation.

### Phase 6: Notifications and Real-time Updates
- Integrate push notification system.
- Implement real-time updates for forums and chat.

### Phase 7: Testing and Deployment
- Conduct thorough testing of all features.
- Deploy the application on a reliable hosting service.

## Future Enhancements
- Expand the app to include more mental health resources and tools.
- Integrate AI-based mental health assessments and recommendations.
- Develop a mobile app version for wider accessibility.

## Conclusion

Bits UI aims to create a supportive and accessible environment for the BITS Pilani Hyderabad community to address mental health concerns. By leveraging modern technologies like Next.js, Supabase, and Claude APIs, the app provides a robust platform for users to connect, share, and seek professional help. This initiative not only promotes mental wellness but also fosters a culture of openness and support within the campus.
## Getting Started
--> add the environmental variables here 
```
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_SECRET=
SUPERTOKENS_API_KEY=
SUPERTOKENS_NODE_URL=

NEXT_PUBLIC_URL=http://localhost:3000/
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_SCHEME=http://
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY =
```
 -->  run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
