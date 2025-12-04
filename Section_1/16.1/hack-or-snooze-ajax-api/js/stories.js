use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  // If user is logged in, make favorite button a solid star for stories in the
  // user's favorites. Make favorite button a regular (outline) star for stories
  // not in the user's favorites.
  const favStatus = currentUser && currentUser.favorites.map(f => f.storyId).includes(story.storyId) ? "fas" : "far";
  const favBtn = `<i class="${favStatus} fa-star fav-btn" data-story-id="${story.storyId}"></i>`;

  const removeBtn = `<i class="fas fa-trash-alt remove-btn" data-story-id="${story.storyId}"></i>`;

  return $(`
      <li id="${story.storyId}">
        ${currentUser ? favBtn : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        ${currentUser && currentUser.username === story.username ? removeBtn : ""}
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle new story form submission. */

async function submitNewStory(evt) {
  console.debug("submitNewStory", evt);
  evt.preventDefault();

  // grab the author, title, and url
  const author = $("#new-story-author").val();
  const title = $("#new-story-title").val();
  const url = $("#new-story-url").val();

  // send story data to API and add story to storyList
  const storyInstance = await storyList.addStory(currentUser, {author, title, url});

  // add Story instance to current user's stories
  currentUser.ownStories.push(storyInstance);

  $newStoryForm.trigger("reset");

  hidePageComponents();
  updateNavUserStories();
  putStoriesOnPage();
}

$newStoryForm.on("submit", submitNewStory);

/** Handle favorite button clicks. */

async function updateFavoriteStories() {
  console.debug(addOrRemoveFavoriteStory);

  // grab storyId for the clicked story
  const clickedStoryId = $(this).data("story-id");

  let updatedUserData;

  // if clicked story is already in the current user's favorites, remove it
  // otherwise, add it
  if (currentUser.favorites.map(f => f.storyId).includes(clickedStoryId)) {
    updatedUserData = await currentUser.addOrRemoveFavoriteStory(clickedStoryId, "DELETE");
  } else {
    updatedUserData = await currentUser.addOrRemoveFavoriteStory(clickedStoryId, "POST");
  }

  // update current user data
  Object.assign(currentUser, updatedUserData);

  updateNavFavorites();
  putStoriesOnPage();
}

$(document).on("click", ".fav-btn", updateFavoriteStories);

/** Generate favorite stories HTML and put them on the page. */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $allStoriesList.empty();

  // loop through all favorite stories and generate HTML for them
  for (let favorite of currentUser.favorites) {
    const storyInstance = new Story(favorite);
    const $story = generateStoryMarkup(storyInstance);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle remove story button click */

async function removeStory() {
  console.debug("removeStory");

  // grab storyId for the clicked story
  const clickedStoryId = $(this).data("story-id");

  // send storyId to API, remove story from storyList and current user's stories
  await storyList.removeStory(currentUser, clickedStoryId);
  currentUser.ownStories = currentUser.ownStories.filter(s => s.storyId != clickedStoryId);
  // also remove story from current user's favorites, if it's a favorite story
  currentUser.favorites = currentUser.favorites.filter(f => f.storyId !== clickedStoryId);

  hidePageComponents();
  updateNavFavorites();
  updateNavUserStories();
  putStoriesOnPage();
}

$(document).on("click", ".remove-btn", removeStory);

/** Generate current user's stories HTML and put them on the page */

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $allStoriesList.empty();

  // loop through all current user's stories and generate HTML for them
  for (let story of currentUser.ownStories.reverse()) {
    const storyInstance = new Story(story);
    const $story = generateStoryMarkup(storyInstance);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
