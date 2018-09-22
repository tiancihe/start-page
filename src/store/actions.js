import unsplash from "@/api";

export default {
    fetchRandomImage({ commit }) {
        unsplash.photos
            .getRandomPhoto({
                query: "landscape wallpaper",
                width: window.screen.width,
                height: window.screen.height
            })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => {
                            const data = {
                                id: json.id,
                                description: json.description,
                                author: json.user.name,
                                html: json.links.html,
                                url: json.urls.custom
                            };
                            // cache the image info object in localStorage
                            localStorage.setItem("imageCache", JSON.stringify(data));
                            commit("setBackdropImage", data);
                        })
                }
            })
            .catch(error => console.log(error));
    }
}