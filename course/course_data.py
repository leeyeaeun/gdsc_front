import json

# Load data from the JSON file
with open("course_data.json", "r", encoding="utf-8") as file:
    courses = json.load(file)

category_courses = {
    "AI": [],
    "EC": [],
    "BS": [],
    "CT": [],
    "CH": [],
    "EV": [],
    "EB": [],
    "IR": [],
    "GS": [],
    "LH": [],
    "MA": [],
    "PS": [],
    "PP": [],
    "MM": [],
    "SS": [],
    "SE": [],
    "UC": [],
    "MD": [],
    "MC": [],
    "MB": [],
    "SE": [],
    "FE":[]
    
}

# 강의 코드 접두어를 기반으로 강의를 카테고리에 분류
for course in courses:
    code_prefix = course["course_code"][:2]
    category_courses.get(code_prefix, []).append(course)

# 각 카테고리를 JSON 파일로 저장
for category, courses_list in category_courses.items():
    filename = f"{category}_courses.json"
    with open(filename, "w", encoding="utf-8") as output_file:
        json.dump(courses_list, output_file, ensure_ascii=False, indent=2)
    print(f"{category} 카테고리의 강의를 {filename} 파일로 저장했습니다.")

# # 중복을 제거하여 누락된 강의 찾기
# missing_courses = [course for course in courses if course not in courses]

# # 누락된 강의 출력
# if missing_courses:
#     print("누락된 강의가 있습니다:")
#     print(missing_courses)
# else:
#     print("모든 강의가 적절한 카테고리에 속해 있습니다.")