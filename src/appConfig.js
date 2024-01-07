/**
 * @file  This file defines the defaults for the app boilerplate
 */

export default {
  // Set the name of your application here
  appName: 'Your App Name Here',
  // Set the Bootswatch Theme your app will use on first load
  theme: 'vapor',
  // Set the color of the background for the nav bar
  navBarBackground: 'info',
  // Set the nav bar to light or dark mode
  navBarMode: 'dark',
  // The width of the sidebar
  sidebarWidth: 280,
  // Set the color of the sidebar buttons
  sidebarButton: 'primary',
  // Set the color of the currently selected sidebar button
  sidebarButtonActive: 'info',
  // Set the color of the "Add" button in the sidebar
  sidebarAdd: 'warning',
  // App Settings page
  settings: {
    // Toggle the visibility of these settings, to allow or prevent the user from modifying them.
    // If all are false, then the top navigation link to the settings page is also hidden.
    showTheme: true,
    showNavBarBackground: true,
    showNavBarMode: true,
    showSidebarButton: true,
    showSidebarButtonActive: true,
    showSidebarAdd: true
  },
  // The Project details page
  project: {
    // The name of the project details page
    title: 'Project Settings'
  }
};
