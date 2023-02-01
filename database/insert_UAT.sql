INSERT INTO public.users (
        id,
        username,
        email,
        "password",
        "type",
        created_at,
        updated_at,
        display_name
    )
VALUES(
        1,
        'Lawrence_@live.hk',
        'Lawrence_@live.hk',
        '$2a$04$6DebxP4UhxEwey7/PLTEJeP9oqhaBV3s9YY1aKHoE4DibmHon/ht6',
        NULL,
        '2023-02-01 16:25:17.342',
        '2023-02-01 16:25:17.342',
        NULL
    );
INSERT INTO public.users (
        id,
        username,
        email,
        "password",
        "type",
        created_at,
        updated_at,
        display_name
    )
VALUES(
        2,
        'lawrence3536@outlook.com',
        'lawrence3536@outlook.com',
        '$2a$04$j3QuevRAVXNAMRa3a1LeluHvpupV89MAkzrGCnikwyC.VOUcToZRC',
        NULL,
        '2023-02-01 16:35:09.613',
        '2023-02-01 16:35:09.613',
        NULL
    );
INSERT INTO public.users (
        id,
        username,
        email,
        "password",
        "type",
        created_at,
        updated_at,
        display_name
    )
VALUES(
        3,
        'admin',
        'admin@gmail.com',
        'admin',
        'teacher',
        '2023-02-01 16:36:41.158',
        '2023-02-01 16:36:41.158',
        NULL
    );
INSERT INTO public.users (
        id,
        username,
        email,
        "password",
        "type",
        created_at,
        updated_at,
        display_name
    )
VALUES(
        4,
        'peter',
        'Peter@123.com',
        'peter',
        'student',
        '2023-02-01 17:27:53.240',
        '2023-02-01 17:27:53.240',
        NULL
    );
INSERT INTO public.teacher (id, user_id, created_at, updated_at)
VALUES(
        1,
        3,
        '2023-02-01 16:36:41.160',
        '2023-02-01 16:36:41.160'
    );
INSERT INTO public.teacher (id, user_id, created_at, updated_at)
VALUES(
        2,
        4,
        '2023-02-01 17:27:53.243',
        '2023-02-01 17:27:53.243'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        1,
        'chi',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '中文'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        2,
        'eng',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '英文'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        3,
        'maths',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '數學'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        4,
        'econ',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '經濟'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        5,
        'ls',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '通識'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        6,
        'bio',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '生物'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        7,
        'chem',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '化學'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        8,
        'phy',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '物理'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        9,
        'geog',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '地理'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        10,
        'chi-history',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '中史'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        11,
        'history',
        '2023-01-18 12:18:49.700',
        '2023-01-18 12:18:49.700',
        '世史'
    );
INSERT INTO public.subject (id, "name", created_at, updated_at, chinese_name)
VALUES(
        12,
        'va',
        '2023-01-26 16:51:50.902',
        '2023-01-26 16:51:50.902',
        '視覺藝術'
    );
INSERT INTO public.student (
        id,
        user_id,
        subject_id,
        school_id,
        academic_level,
        created_at,
        updated_at
    )
VALUES(
        1,
        5,
        4,
        NULL,
        NULL,
        '2023-02-01 17:47:44.506',
        '2023-02-01 17:47:44.506'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        1,
        NULL,
        1,
        'zdgzd',
        '16:25:33',
        '2023-02-01 16:25:33.725',
        '2023-02-01 16:25:33.725',
        0,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        2,
        NULL,
        1,
        'zxcxzc',
        '16:25:36',
        '2023-02-01 16:25:36.457',
        '2023-02-01 16:25:36.457',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        3,
        NULL,
        1,
        'zxczx',
        '16:25:37',
        '2023-02-01 16:25:37.274',
        '2023-02-01 16:25:37.274',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        4,
        NULL,
        2,
        'dsbsd',
        '16:35:19',
        '2023-02-01 16:35:19.469',
        '2023-02-01 16:35:19.469',
        2,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        5,
        NULL,
        2,
        'adsfsafgasf',
        '16:35:20',
        '2023-02-01 16:35:20.844',
        '2023-02-01 16:35:20.844',
        2,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        6,
        NULL,
        2,
        'asfas',
        '16:35:23',
        '2023-02-01 16:35:23.022',
        '2023-02-01 16:35:23.022',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        7,
        NULL,
        2,
        'safas',
        '16:35:24',
        '2023-02-01 16:35:24.063',
        '2023-02-01 16:35:24.063',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        8,
        NULL,
        2,
        'safasf',
        '16:35:25',
        '2023-02-01 16:35:25.133',
        '2023-02-01 16:35:25.133',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        9,
        NULL,
        2,
        'safasf',
        '16:35:27',
        '2023-02-01 16:35:27.302',
        '2023-02-01 16:35:27.302',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        10,
        NULL,
        2,
        'asfsafa',
        '16:35:28',
        '2023-02-01 16:35:28.643',
        '2023-02-01 16:35:28.643',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        11,
        NULL,
        2,
        'safsaf',
        '16:35:29',
        '2023-02-01 16:35:29.565',
        '2023-02-01 16:35:29.565',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        12,
        NULL,
        3,
        'hdfhdfh',
        '17:25:05',
        '2023-02-01 17:25:05.752',
        '2023-02-01 17:25:05.752',
        2,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        13,
        NULL,
        3,
        'dfhdfdfh',
        '17:25:06',
        '2023-02-01 17:25:06.847',
        '2023-02-01 17:25:06.847',
        2,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        14,
        NULL,
        3,
        'dfhdf',
        '17:25:08',
        '2023-02-01 17:25:08.399',
        '2023-02-01 17:25:08.399',
        1,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        15,
        NULL,
        3,
        'safafssa',
        '18:00:32',
        '2023-02-01 18:00:32.967',
        '2023-02-01 18:00:32.967',
        6,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        16,
        NULL,
        3,
        'eges',
        '18:00:37',
        '2023-02-01 18:00:37.471',
        '2023-02-01 18:00:37.471',
        6,
        NULL,
        NULL
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        chat_record,
        chat_message_time,
        created_at,
        updated_at,
        receiver,
        is_public,
        room_id
    )
VALUES(
        17,
        NULL,
        3,
        'seg',
        '18:00:46',
        '2023-02-01 18:00:46.200',
        '2023-02-01 18:00:46.200',
        3,
        NULL,
        NULL
    );