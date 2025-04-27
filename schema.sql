/* 用户表 */
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" VARCHAR NOT NULL,
	-- 密钥
	"token" VARCHAR NOT NULL UNIQUE,
	-- 密钥备注
	"description" VARCHAR NOT NULL DEFAULT "",
	"is_deleted" INTEGER NOT NULL DEFAULT 0 CHECK(is_deleted=0 OR is_deleted=1),
	"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id")
);

/* 书签表 */
DROP TABLE IF EXISTS "bookmarks";
CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" INTEGER NOT NULL UNIQUE,
	"user_id" INTEGER NOT NULL,
	"category_id" INTEGER NOT NULL,
	-- 书签位置
	"position" INTEGER NOT NULL,
	-- 书签名
	"name" VARCHAR NOT NULL,
	-- 书签链接
	"url" VARCHAR NOT NULL,
	-- 图标
	"icon" VARCHAR NOT NULL DEFAULT "React",
	-- 书签备注
	"description" VARCHAR NOT NULL DEFAULT "",
	"is_deleted" INTEGER NOT NULL DEFAULT 0 CHECK(is_deleted=0 OR is_deleted=1),
	"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id"),
	FOREIGN KEY ("category_id") REFERENCES "categories"("id")
	ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE CASCADE ON DELETE CASCADE
);

/* 分类表 */
DROP TABLE IF EXISTS "categories";
CREATE TABLE IF NOT EXISTS "categories" (
	"id" INTEGER NOT NULL UNIQUE,
	"user_id" INTEGER NOT NULL,
	-- 是否为重要书签
	"is_emphasized" INTEGER NOT NULL DEFAULT 0 CHECK(is_emphasized=0 OR is_emphasized=1),
	-- 位置排序
	"position" INTEGER NOT NULL,
	-- 分类名
	"name" VARCHAR NOT NULL,
	-- 分类备注
	"description" VARCHAR NOT NULL DEFAULT "",
	"is_deleted" INTEGER NOT NULL DEFAULT 0 CHECK(is_deleted=0 OR is_deleted=1),
	"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE CASCADE ON DELETE CASCADE
);

/* 验证表 */
DROP TABLE IF EXISTS "cookies";
CREATE TABLE IF NOT EXISTS "cookies" (
	"id" INTEGER NOT NULL UNIQUE,
	"user_id" INTEGER NOT NULL,
	-- 验证信息
	"auth" VARCHAR NOT NULL,
	-- 过期时间
	"expire_at" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP+2592000),
	"create_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE CASCADE ON DELETE CASCADE
);



-- 更新时间触发器
DROP TRIGGER IF EXISTS update_users_update_at;
CREATE TRIGGER update_users_update_at UPDATE OF "name", "token", "description", "is_deleted" ON "users"
BEGIN
  UPDATE "users" SET updated_at=CURRENT_TIMESTAMP WHERE id=NEW.id;
END;
DROP TRIGGER IF EXISTS update_bookmarks_update_at;
CREATE TRIGGER update_bookmarks_update_at UPDATE OF "user_id", "category_id", "position", "name", "url", "icon", "description", "is_deleted" ON "bookmarks"
BEGIN
  UPDATE "bookmarks" SET updated_at=CURRENT_TIMESTAMP WHERE id=NEW.id;
END;
DROP TRIGGER IF EXISTS update_categories_update_at;
CREATE TRIGGER update_categories_update_at UPDATE OF "user_id", "is_emphasized", "position", "name", "description", "is_deleted" ON "categories"
BEGIN
  UPDATE "categories" SET updated_at=CURRENT_TIMESTAMP WHERE id=NEW.id;
END;

/* 开发数据 */
INSERT INTO 'users' ('name','token','description') VALUES
  ('neko','QWPMTgMYsWm1tRCahF91DXrTmVUSwy7Z','开发者账号');

INSERT INTO 'categories' ('user_id','is_emphasized','position','name','description') VALUES
  (1,1,01,'分类1','分类1描述'),
  (1,0,02,'分类2','分类2描述'),
  (1,0,03,'分类3','分类3描述'),
  (1,0,04,'分类4','分类4描述'),
  (1,0,05,'分类5','分类5描述');

INSERT INTO 'bookmarks' ('user_id','category_id','position','name','url','icon','description') VALUES
  (1,01,01,'链接01','https://github.com/','Github','链接01描述'),
  (1,01,02,'链接02','https://github.com/','Github','链接02描述'),
  (1,02,01,'链接03','https://github.com/','Github','链接03描述'),
  (1,02,02,'链接04','https://github.com/','Github','链接04描述'),
  (1,03,01,'链接05','https://github.com/','Github','链接05描述'),
  (1,04,01,'链接06','https://github.com/','Github','链接06描述'),
  (1,04,02,'链接07','https://github.com/','Github','链接07描述'),
  (1,05,01,'链接08','https://github.com/','Github','链接08描述');