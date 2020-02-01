import {ServerSingleton} from '../core/Server';
import {logger} from '../packages/Logger';


(() => {
    ServerSingleton.getInstance();
    logger.info('Starting the app');
})();
