async function injectRoutes() {
    try {
        fetch('/routes-a/.vite/manifest.json')
            .then(res => {
                console.log('manifest', res.body)
            });
        // const routeFile = manifest['routes.js']?.file;
        let routeFile = ''
        if (routeFile) {
            const script = document.createElement('script');
            script.src = `/routes-a/${routeFile}`;
            script.onload = async () => {
                const { routes } = await import(`/routes-a/${routeFile}`);
                const router = window.__APP_ROUTER__;

                routes.forEach(route => {
                    router.addRoute(route);
                });

                console.log('Routes injected successfully');
            };
            document.body.appendChild(script);
        }
    }catch (err){
        console.log('injectRoutes-err' , err)
    }
}

injectRoutes();