export class CategorieEntity {
    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}