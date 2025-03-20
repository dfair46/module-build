// import { nextTick } from 'vue';
async function injectRoutes() {
    try {
        fetch('/routes-a/.vite/manifest.json')
            .then(res => {
                return res.json()
            }).then(mainFile => {
            console.log('manifest', mainFile)
            const routeFile = mainFile['src/blockModule/moduleA/router.ts']?.file;
            console.log('routeFile',routeFile)
            if (routeFile) {
                // css
                const cssList = mainFile['src/blockModule/moduleA/router.ts']?.css
                cssList.map(cssItem => {
                    const cssTest = document.createElement('link')
                    cssTest.rel = "stylesheet"
                    cssTest.href = cssItem
                    cssTest.crossorigin = true
                    document.head.appendChild(cssTest);
                })

                // chunk
                const chunkList = mainFile['src/blockModule/moduleA/router.ts']?.imports
                chunkList.map(chunkItem => {
                    const cssTest = document.createElement('link')
                    cssTest.rel = "modulepreload"
                    cssTest.href = mainFile[chunkItem].file
                    cssTest.crossorigin = true
                    document.head.appendChild(cssTest);
                })

                // const scriptTest = document.createElement('script');
                // scriptTest.src = routeFile;
                // scriptTest.type = "module"
                // scriptTest.crossorigin = true
                // document.head.appendChild(scriptTest);
                // <link rel="stylesheet" href="/assets/css/main.a1b2c3.css" />
                // <script type="module" src="/assets/js/main.a1b2c3.js"></script>

                const script = document.createElement('script');
                script.src = `/routes-a/${routeFile}`;
                script.type = "module"
                script.crossorigin = true
                script.onload = async () => {

                    const { routes } = await import(`/routes-a/${routeFile}`);
                    const router = window.__APP_ROUTER__;
                    await router.isReady();
                    routes.forEach(route => {
                        window._createApp_(route.component)
                        router.addRoute(route);
                    });
                    router.replace(router.currentRoute.value.fullPath);

                    console.log('Routes injected successfully');
                };
                document.head.appendChild(script);
            }

        })


    }catch (err){
        console.log('injectRoutes-err' , err)
    }
}

injectRoutes();