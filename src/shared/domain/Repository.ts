export interface Repository<Entity> {
  // findAllPaginated(pagination: PaginationInput): Promise<Pagination<Entity>>;

  findById(id: number): Promise<Entity>;

  create(entity: Entity): Promise<Entity>;

  update(entity: Entity): Promise<Entity>;

  deleteById(id: number): Promise<void>;
}
