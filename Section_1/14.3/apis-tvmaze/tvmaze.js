/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data. - DONE
  let res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  return res.data.reduce((shows, nextShow) => {
    shows.push({
      id: nextShow.show.id,
      name: nextShow.show.name,
      summary: nextShow.show.summary,
      image: nextShow.show.image ? nextShow.show.image.original : "https://tinyurl.com/tv-missing"
    });
    return shows;
  }, []);
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
        <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${show.image}">
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">${show.summary}</p>
          </div>
          <button class="btn btn-info show-episodes">Episodes</button>
        </div>
      </div>`
      );

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes - DONE
  let res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  return res.data.reduce((episodes, nextEpisode) => {
    episodes.push({
      id: nextEpisode.id,
      name: nextEpisode.name,
      season: nextEpisode.season,
      number: nextEpisode.number
    });
    // TODO: return array-of-episode-info, as described in docstring above - DONE
    return episodes;
  }, []);
}

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  if(!episodes.length) {
    $episodesList.append("<li>No episodes to show!</li>");
  } else {
    for(let episode of episodes) {
      $li = $(
        `<li data-episode-id="${episode.id}">
          ${episode.name} (season ${episode.season}, number ${episode.number})
        </li>`
      );
    $episodesList.append($li);
    }
  }
}

$("#shows-list").on("click", ".show-episodes", async function handleClick(evt) {
  evt.preventDefault();
  $("#episodes-area").show();
  let id = $(evt.target).parent().data("showId");
  let episodes = await getEpisodes(id);
  populateEpisodes(episodes);
});
