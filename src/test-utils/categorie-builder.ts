import { CategorieEntity } from "../modules/categories/domain/Categorie";

export class CategorieBuilder {
  private id: string;
  private name: string;
  private description: string;

  withId(id: string): this {
    this.id = id;
    return this;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withDescription(description: string): this {
    this.description = description;
    return this;
  }

  build(): CategorieEntity {
    return new CategorieEntity(this.id, this.name, this.description);
  }
}
