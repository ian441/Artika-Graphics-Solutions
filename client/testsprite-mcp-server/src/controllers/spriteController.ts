export class SpriteController {
    private sprites: Array<{ id: number; name: string; imageUrl: string }> = [];

    public getAllSprites(req: any, res: any) {
        res.json(this.sprites);
    }

    public getSpriteById(req: any, res: any) {
        const spriteId = parseInt(req.params.id);
        const sprite = this.sprites.find(s => s.id === spriteId);
        if (sprite) {
            res.json(sprite);
        } else {
            res.status(404).send('Sprite not found');
        }
    }

    public createSprite(req: any, res: any) {
        const newSprite = {
            id: this.sprites.length + 1,
            name: req.body.name,
            imageUrl: req.body.imageUrl
        };
        this.sprites.push(newSprite);
        res.status(201).json(newSprite);
    }
}