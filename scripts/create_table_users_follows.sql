USE platzisocial
GO
CREATE TABLE dbo.users_follows
(
	user_from VARCHAR(32) NOT NULL DEFAULT '',
	user_to VARCHAR(32) NOT NULL DEFAULT '',
	CONSTRAINT PK_USER_FOLLOW_USER_FROM_USER_TO PRIMARY KEY (user_from, user_to),
);
GO