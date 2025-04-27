export class DataBookmark {
  id: number;
  name: string;
  url: string;
  icon: string;
  description: string;
  /**
   * 书签数据
   *
   * @param id - 记录 id
   * @param name - 书签名称
   * @param url - 书签链接
   * @param icon - 书签图标
   * @param description - 书签描述
   */
  constructor(
    id: number,
    name: string,
    url: string,
    icon: string = "React",
    description: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.description = description;
  }
}

export class RawBookmark extends DataBookmark {
  user_id: number;
  category_id: number;
  position: number;
  /**
   * 原始书签信息
   *
   * @param id - 记录 id
   * @param user_id - 用户 id
   * @param category_id - 类别 id
   * @param position - 排序位置
   * @param name - 书签名称
   * @param url - 书签链接
   * @param icon - 书签图标
   * @param description - 书签描述
   */
  constructor(
    id: number,
    user_id: number,
    category_id: number,
    position: number,
    name: string,
    url: string,
    icon: string = "React",
    description: string = ""
  ) {
    super(id, name, url, icon, description);
    this.user_id = user_id;
    this.category_id = category_id;
    this.position = position;
  }
  static fromRecord(record: Record<string, string>): RawBookmark {
    return new RawBookmark(
      Number.parseInt(record["id"]),
      Number.parseInt(record["user_id"]),
      Number.parseInt(record["category_id"]),
      Number.parseInt(record["position"]),
      record["name"],
      record["url"],
      record["icon"],
      record["description"]
    );
  }
}
