import express from 'express';
import { json } from 'body-parser';
import { SpriteController } from '../controllers/spriteController';
import config from './config';

const app = express();
const port = config.port || 3000;

app.use(json());

const spriteController = new SpriteController();

app.get('/sprites', spriteController.getAllSprites.bind(spriteController));
app.get('/sprites/:id', spriteController.getSpriteById.bind(spriteController));
app.post('/sprites', spriteController.createSprite.bind(spriteController));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});