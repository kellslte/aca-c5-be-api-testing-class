import { server } from "./app.setup.js";
import { initialiseDatabaseConnection } from "./common/db.js";

async function bootstrap() {
    try{
        await initialiseDatabaseConnection().then(() => {
            server.listen(8000, () => {
                console.info(`Server listening on port ${server.address().port}`);
            });
        });
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

bootstrap().catch((error) => {
    console.error(error);
});