import { DataBookmark } from "./bookmark";

export class Category {
  name: string;
  is_emphasized: number;
  description: string;
  /**
   * 基础目录数据
   *
   * @param name - 类别名称
   * @param is_emphasized - 是否为重要类别
   * @param description - 类别描述
   */
  constructor(
    name: string,
    is_emphasized: number = 0,
    description: string = ""
  ) {
    this.name = name;
    this.is_emphasized = is_emphasized;
    this.description = description;
  }
}

export class RawCategory extends Category {
  id: number;
  user_id: number;
  position: number;
  /**
   * 原始目录信息
   *
   * @param id - 记录 id
   * @param user_id - 用户 id
   * @param name - 类别名称
   * @param position - 排序位置
   * @param is_emphasized - 是否为重要类别
   * @param description - 类别描述
   */
  constructor(
    id: number,
    user_id: number,
    name: string,
    position: number = 0,
    is_emphasized: number = 0,
    description: string = ""
  ) {
    super(name, is_emphasized, description);
    this.id = id;
    this.user_id = user_id;
    this.position = position;
  }
  static fromRecord(record: Record<string, string>): RawCategory {
    return new RawCategory(
      Number.parseInt(record["id"]),
      Number.parseInt(record["user_id"]),
      record["name"],
      Number.parseInt(record["position"]),
      Number.parseInt(record["is_emphasized"]),
      record["description"]
    );
  }
}

export class DataCategory extends Category {
  id: number;
  bookmarks: DataBookmark[];
  /**
   * 目录数据
   *
   * @param id - 记录 id
   * @param name - 类别名称
   * @param is_emphasized - 是否为重要类别
   * @param description - 类别描述
   * @param bookmarks - 包含书签
   */
  constructor(
    id: number,
    name: string,
    is_emphasized: number = 0,
    description: string = "",
    bookmarks: DataBookmark[] = []
  ) {
    super(name, is_emphasized, description);
    this.id = id;
    this.bookmarks = bookmarks;
  }
}
