-- step 1 
INSERT INTO public.users
(username, email, "password", "type", created_at, updated_at)
VALUES('Tom Chan', 'tom@gmail.com', 'admin', 'student', '2023-01-18 12:18:49.673', '2023-01-18 12:18:49.673');
INSERT INTO public.users
(username, email, "password", "type", created_at, updated_at)
VALUES('Mary Chan', 'mary@gmail.com', 'admin', 'student', '2023-01-18 12:18:49.674', '2023-01-18 12:18:49.674');
INSERT INTO public.users
(username, email, "password", "type", created_at, updated_at)
VALUES('Peter Wong', 'peter@gmail.com', 'admin', 'teacher', '2023-01-18 12:18:49.675', '2023-01-18 12:18:49.675');
INSERT INTO public.users
(username, email, "password", "type", created_at, updated_at)
VALUES('Billy Wong', 'billy@gmail.com', 'admin', 'teacher', '2023-01-18 12:18:49.676', '2023-01-18 12:18:49.676');


-- step 2 
INSERT INTO public.teacher
(user_id, created_at, updated_at)
VALUES(3, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.teacher
(user_id, created_at, updated_at)
VALUES(4, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');


-- step 3
INSERT INTO public.subject
("name", created_at, updated_at)
VALUES('chinese', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.subject
("name", created_at, updated_at)
VALUES('english', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.subject
("name", created_at, updated_at)
VALUES('maths', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.subject
("name", created_at, updated_at)
VALUES('econ', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');

-- step 4 
INSERT INTO public.teacher_subject
(subject_id, teacher_id, created_at, updated_at)
VALUES(2, 1, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.teacher_subject
(subject_id, teacher_id, created_at, updated_at)
VALUES(4, 2, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');

-- step 5 
INSERT INTO public.school
("name", created_at, updated_at)
VALUES('迦密主恩中學', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.school
("name", created_at, updated_at)
VALUES('基督教香港信義會元朗信義中學', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.school
("name", created_at, updated_at)
VALUES('景嶺書院', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.school
("name", created_at, updated_at)
VALUES('民生書院', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.school
("name", created_at, updated_at)
VALUES('張祝珊英文中學', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.school
("name", created_at, updated_at)
VALUES('香港培正中學', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');

-- step 6
INSERT INTO public.student
(user_id, subject_id, school_id, academic_level, created_at, updated_at)
VALUES(1, 2, 4, 'F.6', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.student
(user_id, subject_id, school_id, academic_level, created_at, updated_at)
VALUES(2, 4, 6, 'F.4', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');


-- step 7
INSERT INTO public.forum
("name", created_at, updated_at)
VALUES('學術交流板', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.forum
("name", created_at, updated_at)
VALUES('試題資源區', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');

-- step 8
INSERT INTO public.forum_post
("title", status, forum_id, author_id, created_at, updated_at)
VALUES('英國研究：吃塑膠包裝食品1年 等同把2個塑膠袋吃下肚', 'published', 1, 1, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.forum_post
("title", status, forum_id, author_id, created_at, updated_at)
VALUES('美國宣布：對中國晶片出口管制擴大至澳門！以保護國家安全', 'pending', 2, 4, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');

-- step 9
INSERT INTO public.forum_post_comment
("content", author_id, forum_post_id, created_at, updated_at)
VALUES('英國研究團隊發現，從超市買來的塑膠包裝食材，塑膠微粒含量比傳統市場沒有包裝的食材多7倍。吃塑料包裝食品1年，相當於把2個塑膠袋吃下肚。
餐桌上擺滿食材，都是準備做烤雞大餐的材料一半有塑膠包裝，一半沒有。研究人員寇賽蘿開始拆除包裝，將食物裝盤放入微波爐。這些食材都是每年耶誕節，許多家庭會享用傳統餐點。

但現在英國普茲茅斯大學研究團隊發現，這些有塑膠包裝的食材，塑膠微粒含量比傳統市場未包裝的食材多很多。

英國普茲茅斯大學研究人員寇賽蘿博士指出，「有包裝的晚餐，發現的微粒比沒有包裝的晚餐多7倍，因為我們在沒包裝的晚餐中發現了約5萬5千個塑膠微粒。在有包裝的晚餐中，發現了約23萬個塑膠微粒。」

目前醫學研究人員已經在各種人類器官、血液、腸道中，發現有塑膠微粒的存在，但仍無法判定對人體的危害是什麼。但只要持續每天吃塑料包裝食品1年，相當於1年會把2個塑膠袋吃進肚子。

寇賽蘿說道，「如果你1年來每天都吃掉相同數量，有塑膠包裝的晚餐，那麼你每年會吃掉大約10公克塑膠，相當於2個這種塑膠袋。」

由於塑膠垃圾會在降解的過程中產生塑膠微粒，是造成海洋污染的元兇之一。寇賽蘿博士表示，很多人認為只要不吃海產，就不會攝入塑膠微粒，但事實上，現在空氣和土壤中也有許多塑膠微粒。

寇賽蘿表示，「現在可能會有一些塑膠微粒掉在這裡，掉進我們要吃的食物上。但如果你看看農業用的那些塑膠膜，也就是進入我們農田的塑膠量，讓我們土壤中的塑膠微粒濃度很高，實際上比海洋中的還要多。」

專家預估，全球的塑膠生產量將會在20年內翻倍成長，屆時流入海洋的廢塑膠數量，預計也將會在這時期內增加為2倍。', 1, 1, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.forum_post_comment
("content", author_id, forum_post_id, created_at, updated_at)
VALUES('The holiday dinner many are looking forward to this season could come with an unexpected ingredient— plastic.
That’s because a new study published in November from researchers at the University of Portsmouth in England has found that a roast dinner can contain a “staggering” number of microplastics.
Microplastic particles are plastics that are smaller than five millimetres in size, according to a press release from the school.
The university’s study explored whether meal ingredients packaged in plastic would result in more microplastic particles found in the food items
Fay Couceiro, a reader in biochemistry and environmental pollution at the university, conducted the small study by examining two separate roast dinners. Both dinners contained chicken, potatoes, carrots, broccoli, and yorkshire pudding, but one meal was made with ingredients that had been bought wrapped in plastic, while the other was not.
The food made from the plastic-wrapped items contained “seven times more microplastics than the non-plastic wrapped one,” according to the university’spress release about the study’s findings. In total, about 230,000 microplastic particles were found.
This indicates that “plastic packaging is a major route for plastics getting into our bodies,” the release states. Eating one plastic-wrapped dinner each day would amount to about two plastic bags consumed each year, according to the research.
“From the results it would appear that the majority of microplastics in our food come from the plastic packaging it is wrapped in. However, there are other ways that plastic can enter the food chain. It could be getting into the vegetables through the soil or into our meat through grazing,” said Couceiro in the press release.
She also said that air contains microplastics as well, so “they could be falling on top of the food.” As well, the plastics could be coming from the cooking utensils also used when preparing a meal, she explained.
This study differs from the findings of others,as researchers examined what was on the plate after the food had been cooked, as opposed to analyzing raw ingredients in a lab, she said.
“It is likely the microplastics will come from a combination of within the food, the packaging, the cooking utensils and the air,” she said.
Professor Shaji Sebastian, a consultant gastroenterologist at Hull University Teaching Hospital in England said in the press release the results of the study are surprising and indicates research into microplastics should be “urgent”.
“The key is to understand, what are microplastics doing to the body? Do they go to the organs?,” he said. “Those are critical questions that need to be looked into,”he said.
A review study published in 2020 from academics in Italy explained that the implications of microplastics on the human body are not yet thoroughly understood.
The researchers found that the intake of microplastics by humans has been well-established. However, only plastics smaller than 20 micrometres would be able to penetrate organs, and particles would have to be 10 micrometres or less to access all organs and the brain. Ten micrometres is about the diameter of a human blood cell.
However, research published in 2021 by U.K. researchers found that microplastics can cause damage to human cells in the laboratory at levels that are considered normal for people to ingest through their food. But the health impact remains unclear, as researchers are unsure how long plastics remain in the body before they exit through waste.', 4, 2, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');


-- step 10
INSERT INTO public.chatroom
("content", from_user, to_user, created_at, updated_at)
VALUES('有功課想問', 2, 4, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.chatroom
("content", from_user, to_user, created_at, updated_at)
VALUES('教學tips', 3, 2, '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');


-- step 11
INSERT INTO public.blog
(teacher_id, image, "content", created_at, updated_at)
VALUES(1, 'image01.jpg', '測試中文內容', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
INSERT INTO public.blog
(teacher_id, image, "content", created_at, updated_at)
VALUES(2, 'image02.jpg', 'TESTCONTENT', '2023-01-18 12:18:49.700', '2023-01-18 12:18:49.700');
