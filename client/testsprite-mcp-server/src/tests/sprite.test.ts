import { SpriteController } from '../controllers/spriteController';

describe('SpriteController', () => {
    let spriteController: SpriteController;

    beforeEach(() => {
        spriteController = new SpriteController();
    });

    it('should get all sprites', async () => {
        const sprites = await spriteController.getAllSprites();
        expect(sprites).toBeDefined();
        expect(Array.isArray(sprites)).toBe(true);
    });

    it('should get a sprite by id', async () => {
        const spriteId = 1; // Example sprite ID
        const sprite = await spriteController.getSpriteById(spriteId);
        expect(sprite).toBeDefined();
        expect(sprite.id).toBe(spriteId);
    });

    it('should create a new sprite', async () => {
        const newSprite = {
            name: 'Test Sprite',
            imageUrl: 'http://example.com/sprite.png'
        };
        const createdSprite = await spriteController.createSprite(newSprite);
        expect(createdSprite).toBeDefined();
        expect(createdSprite.name).toBe(newSprite.name);
    });
});