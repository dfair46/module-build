async function injectRoutes() {
    try {
        fetch('/routes-a/.vite/manifest.json')
            .then(res => {
                return res.json()
            }).then(res1 => {
            console.log('manifest', res1)
            const routeFile = res1['src/blockModule/moduleA/router.ts']?.file;
            console.log('routeFile',routeFile)
            if (routeFile) {
                const script = document.createElement('script');
                script.src = `/routes-a/${routeFile}`;
                script.onload = async () => {

                    const { routes } = await import(`/routes-a/${routeFile}`);
                    const router = window.__APP_ROUTER__;

                    routes.forEach(route => {
                        router.addRoute(route);
                    });
                    router.replace(router.currentRoute.value.fullPath);

                    console.log('Routes injected successfully');
                };
                document.body.appendChild(script);
            }

        })


    }catch (err){
        console.log('injectRoutes-err' , err)
    }
}

injectRoutes();