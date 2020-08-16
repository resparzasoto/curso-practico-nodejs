USE platzisocial
GO
CREATE TABLE dbo.posts
(
	id VARCHAR(32) NOT NULL DEFAULT '',
	post_text VARCHAR(MAX) NOT NULL DEFAULT '',
	post_user_id VARCHAR(32) NOT NULL DEFAULT '',
	CONSTRAINT PK_POSTS_POST PRIMARY KEY (id),
);
GO