const csrf = getCookie('ct0');
const twid = getCookie("twid").slice(4);

var hasBeenTokenized=false;
var input = document.querySelectorAll('[data-testid=SearchBox_Search_Input]')[0]; 

function getCookie (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

var matchData = function(input, dataList) {
    var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
    return dataList.filter(function(data) {
        if (data.name.match(reg) || data.screen_name.match(reg)) {
            return data;
        }
    });
};

function tokenizeUser(user) {
    let token = document.getElementById("tokenized-node");
    g = document.createElement('div'); 
    g.setAttribute("id", "tokenized-user"); 
    g.innerHTML=user.screen_name; 
    g.style.height=50; 
    g.style.width=50; 
    g.style.display="flex"; 
    g.style.justifyContent="center"; 
    g.style.alignItems="center"; 
    token.after(g);
    input.value = "";
    setTimeout(() => {input.value = ""}, 600);
}

function populateResults(results) {
    const elems = document.getElementsByClassName("match-result");
    if(elems) {
        while(elems.length > 0){
            elems[0].parentNode.removeChild(elems[0]);
        }
    }

    const typeAheadDropdown = document.getElementById("typeaheadDropdown-1");
    const firstResult = typeAheadDropdown.getElementsByClassName("css-1dbjc4n")[0];
    for(let r=0;r<results.length;r++){
        let option = results[r];
        let opt = document.createElement("div");
        opt.classList.add(...["css-1dbjc4n", "match-result"]);
        let optChild1 = document.createElement("div");
        optChild1.classList.add(...["css-18t94o4", "css-1dbjc4n", "r-6dt33c", "r-1ny4l3l", "r-o7ynqc", "r-6416eg"]);
        let optChild2 = document.createElement("div");
        let optChild3 = document.createElement("div");
        let optChild4 = document.createElement("div");
        let optChild4_2 = document.createElement("div");
        optChild2.classList.add(...["css-1dbjc4n", "r-ymttw5", "r-1f1sjgu"]);
        optChild3.classList.add(...["css-1dbjc4n", "r-18u37iz"]);
        optChild4.classList.add(...["css-1dbjc4n", "r-v2d8zz", "r-18kxxzh", "r-1h0z5md", "r-1b7u577"]);
        optChild4_2.classList.add(...["css-1dbjc4n", "r-1iusvr4", "r-16y2uox"]);
        optChild4.innerHTML = `<img src=${option.img} />`
        optChild4_2.innerHTML = `<div><p>${option.name}</p><p>${option.screen_name}</p></div>`
        
        optChild1.appendChild(optChild2);
        optChild2.appendChild(optChild3);
        optChild3.appendChild(optChild4);
        optChild3.appendChild(optChild4_2);
        opt.appendChild(optChild1);
        opt.onclick = (e) => {
            tokenizeUser(option);
        }
        typeAheadDropdown.insertBefore(opt, firstResult);
    }
}

async function makeRequest(){
    var resp = await fetch(`https://twitter.com/i/api/graphql/9rGM7YNDYuiqd0Cb0ZwLJw/Following?variables=%7B%22userId%22%3A%22${twid}%22%2C%22count%22%3A100%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22unified_cards_ad_metadata_container_dynamic_card_content_query_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Atrue%7D`, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,fr;q=0.8",
          "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
          "content-type": "application/json",
          "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-csrf-token": csrf,
          "x-twitter-active-user": "yes",
          "x-twitter-auth-type": "OAuth2Session",
          "x-twitter-client-language": "en",
          "cookie": "guest_id_marketing=v1%3A164014587483243245; guest_id_ads=v1%3A164014587483243245; _ga=GA1.2.504394864.1640145874; kdt=ZDHdIUz9me0krFK67M6hsXGiihFRs4qJxOYPcGDT; dnt=1; personalization_id=\"v1_h8JcjttJg5bySZdrIGLFoA==\"; guest_id=v1%3A166596959065789541; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCGmWhuODAToMY3NyZl9p%250AZCIlM2U2NGZiNzkzYjlhYWUzNDg0MDE1MjdhODA1YjVhZGM6B2lkIiVkYzU4%250AMjk4YTNjZjA2Y2EwYTI1OTI2ZDg2MDczOTRiNw%253D%253D--daf9f43ec8a898308b644e0b152462a60a4257f1; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; gt=1595418985310330881; _gid=GA1.2.2016010147.1669212502; g_state={\"i_p\":1671631705710,\"i_l\":4}; auth_token=8fd0c3d67cbfe075182c736fcf4f950073fa1f7f; twid=u%3D2235391528; att=1-rQUdfG3pnVQKvoXuumhm72Wkba7N11oAizbEm7AG; ct0=f76d25b71750789d83a6a81e53172e896da344a38e1ed31acf71f1f35a9b1633ddec8cf9f82caef5edfef1c60db05c1645cc5dc3deb18d81c29e4eb0316061c88a57257883bb49d5ac33ecefe2f6a282",
        },
        "body": null,
        "method": "GET"
      });
    const res = await resp.json();
    return res;
}

var dataFollowers = [];

var dataRestIds = new Set();

// TODO: refactor this to fetch only first 20 results, then as user scrolls, prefetcth the next 20, etc.
//       similar to how /Followers api works
input.addEventListener('keyup', 
    async (e) => 
    {
        var textVal = e.target.value; 
        var key = event.which || event.keyCode || event.charCode; 
        // console.log(textVal); 
        if(key == 8 && hasBeenTokenized && textVal.length == 0) 
        { 
            input.value = ""; 
            document.getElementById("tokenized-node").remove();
            document.getElementById("tokenized-user").remove();

        } 
        if(textVal == "from:") 
        { 
            input.value = "";
            const res = await makeRequest();
            // console.log(res)
            const followers = res.data.user.result.timeline.timeline.instructions[2].entries;
            for(let f=0;f<followers.length;f++) {
                let follower = followers[f];
                console.log(follower)
                if (follower.entryId.includes("user")) {
                    const user_results = follower.content.itemContent.user_results.result;
                    var f_item = {
                        name:user_results.legacy.name,
                        rest_id:user_results.rest_id,
                        screen_name:"@"+user_results.legacy.screen_name,
                        img:user_results.legacy.profile_image_url_https
                    };
                    if(!dataRestIds.has(user_results.rest_id)){
                        dataRestIds.add(user_results.rest_id);
                        dataFollowers.push(f_item);
                    }
                }
            }
            
            g = document.createElement('div'); 
            g.setAttribute("id", "tokenized-node"); 
            g.innerHTML="from:"; 
            g.style.height=50; 
            g.style.width=50; 
            g.style.display="flex"; 
            g.style.justifyContent="center"; 
            g.style.alignItems="center"; 
            input.parentNode.insertBefore(g, input); 
            input.value=""; 
            setTimeout(() => {input.value = ""}, 600); hasBeenTokenized = true;
        }
        if(hasBeenTokenized && input.value.length > 0){
            let matches = matchData(input.value, dataFollowers);
            populateResults(matches);
        } 
    }, false);
