"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show "favorites" in nav when the user has favorites, otherwise hide. */

function updateNavFavorites() {
  if (!currentUser.favorites.length) {
    $navFavorites.hide();
  } else {
    $navFavorites.show();
  }
}

/** Show "my stories" in nav when the user has stories, otherwise hide. */

function updateNavUserStories() {
  if (!currentUser.ownStories.length) {
    $navUserStories.hide();
  } else {
    $navUserStories.show();
  }
}

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $navLogin.hide();
  $navLogOut.show();
  $navNewStory.show();
  updateNavFavorites();
  updateNavUserStories();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Show new story form on click on "submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $newStoryForm.show();
}

$navNewStory.on("click", navSubmitClick);

/** Show favorite stories on click on "favorites" */

function navFavoritesClick() {
  console.debug("navFavoritesClick");
  hidePageComponents();
  putFavoriteStoriesOnPage();
}

$navFavorites.on("click", navFavoritesClick);

/** Show current user's stories on click on "my stories" */

function navUserStoriesClick() {
  console.debug("navUserStoriesClick");
  hidePageComponents();
  putUserStoriesOnPage();
}

$navUserStories.on("click", navUserStoriesClick);
