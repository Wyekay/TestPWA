let resources = [
    "/",
    "/index.html",
    "/ttst.png",
]

self.addEventListener("install", (e)=>{
    e.waitUntil(
        caches.open("v1")
            .then((cache)=>{
                cache.addAll(resources)
            }).catch(err =>{
                console.error(err);
            })
    )
})

self.addEventListener('fetch', function(event) {
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        // console.log('No response found in cache. About to fetch from network...');
  
        return fetch(event.request).then(function(response) {
        //   console.log('Response from network is:', response);
          return response;
        }).catch(function(error) {
          console.error('Fetching failed:', error);
  
          throw error;
        });
      })
    );
  });

self.addEventListener("push", async (e)=>{
    console.log(await e.data.json())
})