export type HistoryDTO = {
    surveyDto: SurveyDto;
    rankings: Array<Ranking>;
}

export type SurveyDto = {
    surveyId: number;
    workPlaceAddress: string;
    jeonseMin: number | null;
    jeonseMax: number | null;
    monthlyMin: number | null;
    monthlyMax: number | null;
    depositMin: number | null;
    depositMax: number | null;
    preferenceLargeStore: "LOW" | "MIDDLE" | "HIGH";
    preferenceHospital: "LOW" | "MIDDLE" | "HIGH";
    preferenceSubway: "LOW" | "MIDDLE" | "HIGH";
    preferenceLibrary: "LOW" | "MIDDLE" | "HIGH";
    surveySelectedDistrictList: Array<District>;
    submittedAt: string;
}

export type District = {
    id: number;
    districtName: string;
}

export type Ranking = {
    ranking: number;
    dongCode: number;
    commuteTime: number;
}


export const dummy = {
    "code": "SUCCESS",
    "message": "요청이 성공하였습니다.",
    "content": {
        "surveyDto": {
            "surveyId": 8,
            "workPlaceAddress": "경기도 과천시 과천대로12길 117 아이티센타워 E동",
            "jeonseMin": 10000,
            "jeonseMax": 20000,
            "monthlyMin": null,
            "monthlyMax": null,
            "depositMin": null,
            "depositMax": null,
            "preferenceLargeStore": "MIDDLE",
            "preferenceHospital": "MIDDLE",
            "preferenceSubway": "HIGH",
            "preferenceLibrary": "LOW",
            "surveySelectedDistrictList": [
                {
                    "id": 19,
                    "districtName": "관악구"
                },
                {
                    "id": 18,
                    "districtName": "송파구"
                },
                {
                    "id": 20,
                    "districtName": "중랑구"
                }
            ],
            "submittedAt": "2026-05-13"
        },
        "rankings": [
            {
                "ranking": 1,
                "dongCode": 1171010500,
                "commuteTime": 71
            },
            {
                "ranking": 2,
                "dongCode": 1162010100,
                "commuteTime": 43
            },
            {
                "ranking": 3,
                "dongCode": 1126010200,
                "commuteTime": 74
            },
            {
                "ranking": 4,
                "dongCode": 1171010100,
                "commuteTime": 54
            },
            {
                "ranking": 5,
                "dongCode": 1162010200,
                "commuteTime": 57
            },
            {
                "ranking": 6,
                "dongCode": 1171010600,
                "commuteTime": 68
            },
            {
                "ranking": 7,
                "dongCode": 1171010700,
                "commuteTime": 73
            },
            {
                "ranking": 8,
                "dongCode": 1126010100,
                "commuteTime": 68
            },
            {
                "ranking": 9,
                "dongCode": 1126010300,
                "commuteTime": 78
            },
            {
                "ranking": 10,
                "dongCode": 1171010400,
                "commuteTime": 69
            }
        ]
    }
}