export interface Sprite {
    id: string;
    name: string;
    imageUrl: string;
}

export class SpriteModel {
    constructor(private sprite: Sprite) {}

    getId(): string {
        return this.sprite.id;
    }

    getName(): string {
        return this.sprite.name;
    }

    getImageUrl(): string {
        return this.sprite.imageUrl;
    }

    // Additional methods for database interaction can be added here
}