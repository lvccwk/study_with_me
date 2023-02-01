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
INSERT INTO public.image (id, user_id, image_icon, created_at, updated_at)
VALUES(
        1,
        1,
        'image-1674727526524.png',
        '2023-01-26 18:05:26.541',
        '2023-01-26 18:05:26.541'
    );
INSERT INTO public.image (id, user_id, image_icon, created_at, updated_at)
VALUES(
        2,
        2,
        'image-1674727526524.png',
        '2023-01-26 18:05:26.541',
        '2023-01-26 18:05:26.541'
    );
INSERT INTO public.image (id, user_id, image_icon, created_at, updated_at)
VALUES(
        3,
        4,
        'image-1674727526524.png',
        '2023-01-26 18:05:26.541',
        '2023-01-26 18:05:26.541'
    );
INSERT INTO public.image (id, user_id, image_icon, created_at, updated_at)
VALUES(
        4,
        3,
        'image-1674727526524.png',
        '2023-01-26 18:05:26.541',
        '2023-01-26 18:05:26.541'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        1,
        2,
        1,
        0,
        NULL,
        NULL,
        'zdgzd',
        '16:25:33',
        '2023-02-01 16:25:33.725',
        '2023-02-01 16:25:33.725'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        2,
        2,
        1,
        1,
        NULL,
        NULL,
        'zxcxzc',
        '16:25:36',
        '2023-02-01 16:25:36.457',
        '2023-02-01 16:25:36.457'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        3,
        4,
        1,
        1,
        NULL,
        NULL,
        'zxczx',
        '16:25:37',
        '2023-02-01 16:25:37.274',
        '2023-02-01 16:25:37.274'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        4,
        2,
        2,
        2,
        NULL,
        NULL,
        'dsbsd',
        '16:35:19',
        '2023-02-01 16:35:19.469',
        '2023-02-01 16:35:19.469'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        5,
        3,
        2,
        2,
        NULL,
        NULL,
        'adsfsafgasf',
        '16:35:20',
        '2023-02-01 16:35:20.844',
        '2023-02-01 16:35:20.844'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        6,
        2,
        2,
        1,
        NULL,
        NULL,
        'asfas',
        '16:35:23',
        '2023-02-01 16:35:23.022',
        '2023-02-01 16:35:23.022'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        7,
        3,
        2,
        1,
        NULL,
        NULL,
        'safas',
        '16:35:24',
        '2023-02-01 16:35:24.063',
        '2023-02-01 16:35:24.063'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        8,
        1,
        2,
        1,
        NULL,
        NULL,
        'safasf',
        '16:35:25',
        '2023-02-01 16:35:25.133',
        '2023-02-01 16:35:25.133'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        9,
        3,
        2,
        1,
        NULL,
        NULL,
        'safasf',
        '16:35:27',
        '2023-02-01 16:35:27.302',
        '2023-02-01 16:35:27.302'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        10,
        2,
        2,
        1,
        NULL,
        NULL,
        'safsaf',
        '16:35:29',
        '2023-02-01 16:35:29.565',
        '2023-02-01 16:35:29.565'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        11,
        1,
        3,
        2,
        NULL,
        NULL,
        'hdfhdfh',
        '17:25:05',
        '2023-02-01 17:25:05.752',
        '2023-02-01 17:25:05.752'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        12,
        1,
        3,
        2,
        NULL,
        NULL,
        'dfhdfdfh',
        '17:25:06',
        '2023-02-01 17:25:06.847',
        '2023-02-01 17:25:06.847'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        13,
        1,
        3,
        1,
        NULL,
        NULL,
        'dfhdf',
        '17:25:08',
        '2023-02-01 17:25:08.399',
        '2023-02-01 17:25:08.399'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        14,
        1,
        3,
        6,
        NULL,
        NULL,
        'safafssa',
        '18:00:32',
        '2023-02-01 18:00:32.967',
        '2023-02-01 18:00:32.967'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        15,
        1,
        3,
        6,
        NULL,
        NULL,
        'eges',
        '18:00:37',
        '2023-02-01 18:00:37.471',
        '2023-02-01 18:00:37.471'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        16,
        1,
        3,
        3,
        NULL,
        NULL,
        'seg',
        '18:00:46',
        '2023-02-01 18:00:46.200',
        '2023-02-01 18:00:46.200'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        17,
        NULL,
        3,
        0,
        NULL,
        NULL,
        '123
',
        '19:12:57',
        '2023-02-01 19:12:57.710',
        '2023-02-01 19:12:57.710'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        18,
        NULL,
        3,
        1,
        NULL,
        NULL,
        '4124',
        '19:13:04',
        '2023-02-01 19:13:04.630',
        '2023-02-01 19:13:04.630'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        19,
        NULL,
        3,
        4,
        NULL,
        NULL,
        '234',
        '19:13:06',
        '2023-02-01 19:13:06.514',
        '2023-02-01 19:13:06.514'
    );
INSERT INTO public.public_chat (
        id,
        user_id,
        sender,
        receiver,
        is_public,
        room_id,
        chat_record,
        chat_message_time,
        created_at,
        updated_at
    )
VALUES(
        20,
        NULL,
        3,
        3,
        NULL,
        NULL,
        '123213',
        '19:13:08',
        '2023-02-01 19:13:08.537',
        '2023-02-01 19:13:08.537'
    );