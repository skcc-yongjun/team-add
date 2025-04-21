import type {
  AdmissionGuideline,
  Department,
  ScoreAnalysisResult,
  Content,
  Post,
  CounselingStatistics,
} from "@/types/acs"

// 모집 요강 목업 데이터
export const mockGuidelines: AdmissionGuideline[] = [
  {
    guidelineId: 1,
    admissionRound: "2024학년도 수시",
    admissionType: "학생부종합",
    title: "2024학년도 수시 학생부종합전형 모집 요강",
    content: `
      <h2>2024학년도 수시 학생부종합전형 모집 요강</h2>
      <h3>1. 전형 개요</h3>
      <p>학생부종합전형은 학생의 학업 역량, 전공적합성, 인성, 발전가능성 등을 종합적으로 평가하는 전형입니다.</p>
      
      <h3>2. 전형 방법</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>서류평가</th>
            <th>면접평가</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1단계</td>
            <td>100%</td>
            <td>-</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>2단계</td>
            <td>70%</td>
            <td>30%</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
      
      <h3>3. 제출 서류</h3>
      <ul>
        <li>학교생활기록부</li>
        <li>자기소개서</li>
        <li>추천서(선택)</li>
      </ul>
      
      <h3>4. 전형 일정</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>일정</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>원서접수</td>
            <td>2023.09.11(월) ~ 09.15(금)</td>
            <td>인터넷 접수</td>
          </tr>
          <tr>
            <td>서류제출</td>
            <td>2023.09.11(월) ~ 09.18(월)</td>
            <td>우편 또는 방문</td>
          </tr>
          <tr>
            <td>1단계 발표</td>
            <td>2023.11.10(금)</td>
            <td>홈페이지 공지</td>
          </tr>
          <tr>
            <td>면접</td>
            <td>2023.11.25(토) ~ 11.26(일)</td>
            <td>대학 지정 장소</td>
          </tr>
          <tr>
            <td>최종 합격자 발표</td>
            <td>2023.12.15(금)</td>
            <td>홈페이지 공지</td>
          </tr>
        </tbody>
      </table>
    `,
    attachments: [
      {
        attachmentId: 1,
        fileName: "2024학년도_수시_학생부종합전형_모집요강.pdf",
        fileSize: 2048000,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-06-15T10:30:00Z",
      },
    ],
    lastUpdated: "2023-06-15T10:30:00Z",
  },
  {
    guidelineId: 2,
    admissionRound: "2024학년도 수시",
    admissionType: "학생부교과",
    title: "2024학년도 수시 학생부교과전형 모집 요강",
    content: `
      <h2>2024학년도 수시 학생부교과전형 모집 요강</h2>
      <h3>1. 전형 개요</h3>
      <p>학생부교과전형은 학생의 교과 성적을 중심으로 평가하는 전형입니다.</p>
      
      <h3>2. 전형 방법</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>학생부 교과</th>
            <th>비교과</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>일괄합산</td>
            <td>90%</td>
            <td>10%</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
      
      <h3>3. 제출 서류</h3>
      <ul>
        <li>학교생활기록부</li>
      </ul>
      
      <h3>4. 전형 일정</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>일정</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>원서접수</td>
            <td>2023.09.11(월) ~ 09.15(금)</td>
            <td>인터넷 접수</td>
          </tr>
          <tr>
            <td>서류제출</td>
            <td>2023.09.11(월) ~ 09.18(월)</td>
            <td>우편 또는 방문</td>
          </tr>
          <tr>
            <td>합격자 발표</td>
            <td>2023.12.15(금)</td>
            <td>홈페이지 공지</td>
          </tr>
        </tbody>
      </table>
    `,
    attachments: [
      {
        attachmentId: 2,
        fileName: "2024학년도_수시_학생부교과전형_모집요강.pdf",
        fileSize: 1843200,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-06-15T11:30:00Z",
      },
    ],
    lastUpdated: "2023-06-15T11:30:00Z",
  },
  {
    guidelineId: 3,
    admissionRound: "2024학년도 정시",
    admissionType: "수능위주",
    title: "2024학년도 정시 수능위주전형 모집 요강",
    content: `
      <h2>2024학년도 정시 수능위주전형 모집 요강</h2>
      <h3>1. 전형 개요</h3>
      <p>수능위주전형은 대학수학능력시험 성적을 중심으로 평가하는 전형입니다.</p>
      
      <h3>2. 전형 방법</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>수능</th>
            <th>학생부</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>일괄합산</td>
            <td>100%</td>
            <td>-</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
      
      <h3>3. 제출 서류</h3>
      <ul>
        <li>학교생활기록부</li>
      </ul>
      
      <h3>4. 전형 일정</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>일정</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>원서접수</td>
            <td>2023.12.29(금) ~ 2024.01.02(화)</td>
            <td>인터넷 접수</td>
          </tr>
          <tr>
            <td>서류제출</td>
            <td>2023.12.29(금) ~ 2024.01.05(금)</td>
            <td>우편 또는 방문</td>
          </tr>
          <tr>
            <td>합격자 발표</td>
            <td>2024.02.06(화)</td>
            <td>홈페이지 공지</td>
          </tr>
        </tbody>
      </table>
    `,
    attachments: [
      {
        attachmentId: 3,
        fileName: "2024학년도_정시_수능위주전형_모집요강.pdf",
        fileSize: 1945600,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-09-20T14:30:00Z",
      },
    ],
    lastUpdated: "2023-09-20T14:30:00Z",
  },
]

// 학과 정보 목업 데이터
export const mockDepartments: Department[] = [
  {
    departmentCode: "CS",
    departmentName: "컴퓨터공학과",
    college: "공과대학",
    introduction: `
      <p>컴퓨터공학과는 컴퓨터 하드웨어, 소프트웨어, 네트워크 등 컴퓨터 시스템 전반에 대한 지식과 기술을 연구하고 교육합니다.</p>
      <p>4차 산업혁명 시대의 핵심 기술인 인공지능, 빅데이터, 클라우드 컴퓨팅, 사물인터넷 등의 분야에서 창의적인 문제 해결 능력을 갖춘 인재를 양성합니다.</p>
    `,
    curriculum: `
      <h3>주요 교과목</h3>
      <ul>
        <li>1학년: 컴퓨터 프로그래밍 기초, 이산수학, 컴퓨터 개론</li>
        <li>2학년: 자료구조, 알고리즘, 컴퓨터 구조, 객체지향 프로그래밍</li>
        <li>3학년: 운영체제, 데이터베이스, 컴퓨터 네트워크, 소프트웨어 공학</li>
        <li>4학년: 인공지능, 빅데이터 분석, 클라우드 컴퓨팅, 캡스톤 디자인</li>
      </ul>
    `,
    career: `
      <h3>졸업 후 진로</h3>
      <ul>
        <li>소프트웨어 개발자: 웹/앱 개발, 시스템 소프트웨어 개발</li>
        <li>데이터 전문가: 데이터 엔지니어, 데이터 분석가, 데이터 사이언티스트</li>
        <li>인공지능 전문가: AI 엔지니어, 머신러닝 엔지니어</li>
        <li>보안 전문가: 정보보안 컨설턴트, 보안 엔지니어</li>
        <li>대학원 진학: 국내외 대학원 진학을 통한 연구 활동</li>
      </ul>
    `,
    admissionResults: [
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부종합",
        applicants: 150,
        acceptedCount: 30,
        competitionRate: 5.0,
        minScore: 85.2,
        avgScore: 89.7,
      },
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부교과",
        applicants: 120,
        acceptedCount: 20,
        competitionRate: 6.0,
        minScore: 92.5,
        avgScore: 94.3,
      },
      {
        year: "2023",
        admissionRound: "정시",
        admissionType: "수능위주",
        applicants: 200,
        acceptedCount: 40,
        competitionRate: 5.0,
        minScore: 88.7,
        avgScore: 91.2,
      },
    ],
    attachments: [
      {
        attachmentId: 4,
        fileName: "컴퓨터공학과_커리큘럼.pdf",
        fileSize: 1228800,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-05-10T09:30:00Z",
      },
    ],
    lastUpdated: "2023-05-10T09:30:00Z",
  },
  {
    departmentCode: "EE",
    departmentName: "전자공학과",
    college: "공과대학",
    introduction: `
      <p>전자공학과는 전자기기 및 시스템의 설계, 개발, 제조에 필요한 이론과 기술을 연구하고 교육합니다.</p>
      <p>반도체, 통신, 제어, 신호처리 등의 분야에서 창의적인 문제 해결 능력을 갖춘 인재를 양성합니다.</p>
    `,
    curriculum: `
      <h3>주요 교과목</h3>
      <ul>
        <li>1학년: 전자공학 개론, 기초 전자회로, 공학수학</li>
        <li>2학년: 디지털 논리회로, 전자기학, 회로이론, 신호 및 시스템</li>
        <li>3학년: 반도체 공학, 통신이론, 제어공학, 마이크로프로세서</li>
        <li>4학년: 집적회로 설계, 디지털 신호처리, 무선통신, 캡스톤 디자인</li>
      </ul>
    `,
    career: `
      <h3>졸업 후 진로</h3>
      <ul>
        <li>반도체 산업: 반도체 설계 엔지니어, 공정 엔지니어</li>
        <li>통신 산업: 통신 시스템 엔지니어, 네트워크 엔지니어</li>
        <li>가전/모바일 산업: 제품 설계 엔지니어, 임베디드 시스템 개발자</li>
        <li>자동차 산업: 자동차 전자장치 개발 엔지니어</li>
        <li>대학원 진학: 국내외 대학원 진학을 통한 연구 활동</li>
      </ul>
    `,
    admissionResults: [
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부종합",
        applicants: 130,
        acceptedCount: 25,
        competitionRate: 5.2,
        minScore: 84.8,
        avgScore: 88.5,
      },
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부교과",
        applicants: 110,
        acceptedCount: 20,
        competitionRate: 5.5,
        minScore: 91.8,
        avgScore: 93.6,
      },
      {
        year: "2023",
        admissionRound: "정시",
        admissionType: "수능위주",
        applicants: 180,
        acceptedCount: 35,
        competitionRate: 5.14,
        minScore: 87.9,
        avgScore: 90.5,
      },
    ],
    attachments: [
      {
        attachmentId: 5,
        fileName: "전자공학과_커리큘럼.pdf",
        fileSize: 1126400,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-05-12T10:30:00Z",
      },
    ],
    lastUpdated: "2023-05-12T10:30:00Z",
  },
  {
    departmentCode: "BIZ",
    departmentName: "경영학과",
    college: "경영대학",
    introduction: `
      <p>경영학과는 기업 경영에 필요한 이론과 실무 지식을 연구하고 교육합니다.</p>
      <p>마케팅, 재무, 회계, 인사/조직, 생산관리, 경영정보 등의 분야에서 창의적인 문제 해결 능력을 갖춘 인재를 양성합니다.</p>
    `,
    curriculum: `
      <h3>주요 교과목</h3>
      <ul>
        <li>1학년: 경영학 원론, 경제학 원론, 회계원리</li>
        <li>2학년: 마케팅 원론, 재무관리, 인적자원관리, 경영통계</li>
        <li>3학년: 소비자행동론, 투자론, 조직행동론, 생산운영관리</li>
        <li>4학년: 마케팅 전략, 기업재무, 경영전략, 창업론</li>
      </ul>
    `,
    career: `
      <h3>졸업 후 진로</h3>
      <ul>
        <li>일반 기업: 마케팅, 재무, 인사, 기획 등 각 부서</li>
        <li>금융권: 은행, 증권사, 보험사 등</li>
        <li>회계/컨설팅: 회계법인, 컨설팅 회사</li>
        <li>공공기관: 공기업, 정부기관</li>
        <li>창업: 벤처기업 창업</li>
      </ul>
    `,
    admissionResults: [
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부종합",
        applicants: 200,
        acceptedCount: 40,
        competitionRate: 5.0,
        minScore: 86.5,
        avgScore: 90.2,
      },
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부교과",
        applicants: 180,
        acceptedCount: 30,
        competitionRate: 6.0,
        minScore: 93.2,
        avgScore: 95.1,
      },
      {
        year: "2023",
        admissionRound: "정시",
        admissionType: "수능위주",
        applicants: 250,
        acceptedCount: 50,
        competitionRate: 5.0,
        minScore: 89.5,
        avgScore: 92.3,
      },
    ],
    attachments: [
      {
        attachmentId: 6,
        fileName: "경영학과_커리큘럼.pdf",
        fileSize: 1024000,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-05-15T11:30:00Z",
      },
    ],
    lastUpdated: "2023-05-15T11:30:00Z",
  },
  {
    departmentCode: "MED",
    departmentName: "의예과",
    college: "의과대학",
    introduction: `
      <p>의예과는 의사가 되기 위한 기초 과정으로, 의학 학습에 필요한 기초 과학 지식과 인문사회 소양을 교육합니다.</p>
      <p>2년의 의예과 과정 후 4년의 의학과 과정을 거쳐 의사 국가고시를 통해 의사 자격을 취득할 수 있습니다.</p>
    `,
    curriculum: `
      <h3>주요 교과목</h3>
      <ul>
        <li>1학년: 일반생물학, 일반화학, 일반물리학, 의학입문, 의료인문학</li>
        <li>2학년: 유기화학, 생화학, 세포생물학, 인체해부학 입문, 의학통계</li>
        <li>3-6학년(의학과): 해부학, 생리학, 병리학, 약리학, 내과학, 외과학 등</li>
      </ul>
    `,
    career: `
      <h3>졸업 후 진로</h3>
      <ul>
        <li>임상의사: 대학병원, 종합병원, 개인병원</li>
        <li>의학 연구자: 의학 연구소, 제약회사 연구소</li>
        <li>공공 보건 분야: 보건소, 질병관리청</li>
        <li>의료 행정: 병원 행정, 보건 정책</li>
        <li>의학 교육자: 의과대학 교수</li>
      </ul>
    `,
    admissionResults: [
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부종합",
        applicants: 300,
        acceptedCount: 15,
        competitionRate: 20.0,
        minScore: 95.8,
        avgScore: 97.2,
      },
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부교과",
        applicants: 250,
        acceptedCount: 10,
        competitionRate: 25.0,
        minScore: 98.5,
        avgScore: 99.1,
      },
      {
        year: "2023",
        admissionRound: "정시",
        admissionType: "수능위주",
        applicants: 400,
        acceptedCount: 20,
        competitionRate: 20.0,
        minScore: 96.7,
        avgScore: 98.3,
      },
    ],
    attachments: [
      {
        attachmentId: 7,
        fileName: "의예과_커리큘럼.pdf",
        fileSize: 1331200,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-05-20T13:30:00Z",
      },
    ],
    lastUpdated: "2023-05-20T13:30:00Z",
  },
  {
    departmentCode: "PSYCH",
    departmentName: "심리학과",
    college: "사회과학대학",
    introduction: `
      <p>심리학과는 인간의 행동과 정신 과정에 대한 과학적 연구를 통해 인간에 대한 이해를 높이는 학문입니다.</p>
      <p>인지, 발달, 사회, 임상, 상담 등 다양한 분야의 심리학 이론과 연구 방법을 교육합니다.</p>
    `,
    curriculum: `
      <h3>주요 교과목</h3>
      <ul>
        <li>1학년: 심리학 개론, 심리통계, 발달심리학</li>
        <li>2학년: 인지심리학, 사회심리학, 성격심리학, 심리검사</li>
        <li>3학년: 임상심리학, 상담심리학, 이상심리학, 산업심리학</li>
        <li>4학년: 건강심리학, 심리치료, 심리학 연구법, 캡스톤 디자인</li>
      </ul>
    `,
    career: `
      <h3>졸업 후 진로</h3>
      <ul>
        <li>상담/임상 분야: 상담사, 임상심리사, 심리치료사</li>
        <li>교육 분야: 학교상담사, 교육심리전문가</li>
        <li>산업 분야: 인사/조직 컨설턴트, 소비자 행동 분석가</li>
        <li>연구 분야: 연구소, 대학원 진학</li>
        <li>공공 분야: 교정직 공무원, 청소년 상담사</li>
      </ul>
    `,
    admissionResults: [
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부종합",
        applicants: 120,
        acceptedCount: 25,
        competitionRate: 4.8,
        minScore: 83.5,
        avgScore: 87.8,
      },
      {
        year: "2023",
        admissionRound: "수시",
        admissionType: "학생부교과",
        applicants: 100,
        acceptedCount: 20,
        competitionRate: 5.0,
        minScore: 90.2,
        avgScore: 92.5,
      },
      {
        year: "2023",
        admissionRound: "정시",
        admissionType: "수능위주",
        applicants: 150,
        acceptedCount: 30,
        competitionRate: 5.0,
        minScore: 85.6,
        avgScore: 88.9,
      },
    ],
    attachments: [
      {
        attachmentId: 8,
        fileName: "심리학과_커리큘럼.pdf",
        fileSize: 972800,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-05-18T14:30:00Z",
      },
    ],
    lastUpdated: "2023-05-18T14:30:00Z",
  },
]

// 성적 분석 결과 목업 데이터
export const mockScoreAnalysisResult: ScoreAnalysisResult = {
  estimatedScores: [
    { admissionType: "학생부교과", score: 87.5 },
    { admissionType: "학생부종합", score: 85.2 },
    { admissionType: "논술", score: 82.8 },
    { admissionType: "수능위주", score: 84.6 },
  ],
  recommendations: [
    {
      departmentName: "컴퓨터공학과",
      departmentCode: "CS",
      admissionType: "학생부교과",
      likelihood: "소신",
    },
    {
      departmentName: "전자공학과",
      departmentCode: "EE",
      admissionType: "학생부교과",
      likelihood: "안정",
    },
    {
      departmentName: "경영학과",
      departmentCode: "BIZ",
      admissionType: "학생부종합",
      likelihood: "안정",
    },
    {
      departmentName: "심리학과",
      departmentCode: "PSYCH",
      admissionType: "학생부종합",
      likelihood: "소신",
    },
  ],
  advice:
    "학생부교과전형으로 지원할 경우 전자공학과는 안정적으로 합격 가능성이 있으며, 컴퓨터공학과는 소신 지원을 권장합니다. 학생부종합전형의 경우 경영학과가 안정적인 선택이 될 수 있습니다. 수능 최저학력기준을 충족할 수 있도록 영어와 탐구 과목 학습에 집중하시기 바랍니다.",
}

// 콘텐츠 관리 목업 데이터
export const mockContents: Content[] = [
  {
    contentId: 1,
    contentType: "GUIDELINE",
    title: "2024학년도 수시 학생부종합전형 모집 요강",
    content: `
      <h2>2024학년도 수시 학생부종합전형 모집 요강</h2>
      <h3>1. 전형 개요</h3>
      <p>학생부종합전형은 학생의 학업 역량, 전공적합성, 인성, 발전가능성 등을 종합적으로 평가하는 전형입니다.</p>
      
      <h3>2. 전형 방법</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>서류평가</th>
            <th>면접평가</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1단계</td>
            <td>100%</td>
            <td>-</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>2단계</td>
            <td>70%</td>
            <td>30%</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    `,
    targetId: "2024-수시-학생부종합",
    isPublished: true,
    attachments: [
      {
        attachmentId: 1,
        fileName: "2024학년도_수시_학생부종합전형_모집요강.pdf",
        fileSize: 2048000,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-06-15T10:30:00Z",
      },
    ],
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    createdBy: "admin",
  },
  {
    contentId: 2,
    contentType: "DEPARTMENT",
    title: "컴퓨터공학과 소개",
    content: `
      <p>컴퓨터공학과는 컴퓨터 하드웨어, 소프트웨어, 네트워크 등 컴퓨터 시스템 전반에 대한 지식과 기술을 연구하고 교육합니다.</p>
      <p>4차 산업혁명 시대의 핵심 기술인 인공지능, 빅데이터, 클라우드 컴퓨팅, 사물인터넷 등의 분야에서 창의적인 문제 해결 능력을 갖춘 인재를 양성합니다.</p>
    `,
    targetId: "CS",
    isPublished: true,
    attachments: [
      {
        attachmentId: 4,
        fileName: "컴퓨터공학과_커리큘럼.pdf",
        fileSize: 1228800,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-05-10T09:30:00Z",
      },
    ],
    createdAt: "2023-05-10T09:30:00Z",
    updatedAt: "2023-05-10T09:30:00Z",
    createdBy: "admin",
  },
  {
    contentId: 3,
    contentType: "FAQ",
    title: "학생부종합전형 자기소개서 작성 요령",
    content: `
      <h3>자기소개서 작성 시 유의사항</h3>
      <ol>
        <li>지원 동기와 학업 계획을 구체적으로 작성하세요.</li>
        <li>고교 생활 중 의미 있는 활동과 그로부터 배운 점을 중심으로 작성하세요.</li>
        <li>진로 탐색 과정과 지원 학과와의 연관성을 설명하세요.</li>
        <li>자신만의 특성이 드러나도록 구체적인 사례를 들어 작성하세요.</li>
      </ol>
    `,
    isPublished: true,
    createdAt: "2023-07-05T14:30:00Z",
    updatedAt: "2023-07-05T14:30:00Z",
    createdBy: "admin",
  },
  {
    contentId: 4,
    contentType: "MATERIAL",
    title: "2023학년도 입시 결과 분석",
    content: `
      <h3>2023학년도 입시 결과 주요 특징</h3>
      <ul>
        <li>학생부종합전형 경쟁률 전년 대비 0.5:1 상승</li>
        <li>학생부교과전형 합격자 평균 내신 등급 0.2점 상승</li>
        <li>정시모집 수능 최저점 전년 대비 2점 상승</li>
      </ul>
      <p>자세한 내용은 첨부 파일을 참고하세요.</p>
    `,
    isPublished: true,
    attachments: [
      {
        attachmentId: 9,
        fileName: "2023학년도_입시결과분석.pdf",
        fileSize: 1536000,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-03-10T11:30:00Z",
      },
    ],
    createdAt: "2023-03-10T11:30:00Z",
    updatedAt: "2023-03-10T11:30:00Z",
    createdBy: "admin",
  },
  {
    contentId: 5,
    contentType: "GUIDELINE",
    title: "2024학년도 수시 학생부교과전형 모집 요강",
    content: `
      <h2>2024학년도 수시 학생부교과전형 모집 요강</h2>
      <h3>1. 전형 개요</h3>
      <p>학생부교과전형은 학생의 교과 성적을 중심으로 평가하는 전형입니다.</p>
      
      <h3>2. 전형 방법</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>구분</th>
            <th>학생부 교과</th>
            <th>비교과</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>일괄합산</td>
            <td>90%</td>
            <td>10%</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    `,
    targetId: "2024-수시-학생부교과",
    isPublished: true,
    attachments: [
      {
        attachmentId: 2,
        fileName: "2024학년도_수시_학생부교과전형_모집요강.pdf",
        fileSize: 1843200,
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-06-15T11:30:00Z",
      },
    ],
    createdAt: "2023-06-15T11:30:00Z",
    updatedAt: "2023-06-15T11:30:00Z",
    createdBy: "admin",
  },
]

// 게시판 목업 데이터
export const mockPosts: Record<string, Post[]> = {
  NOTICE: [
    {
      postId: 1,
      boardType: "NOTICE",
      title: "2024학년도 수시모집 원서접수 안내",
      content: `
        <h3>2024학년도 수시모집 원서접수 안내</h3>
        <p>2024학년도 수시모집 원서접수를 다음과 같이 진행합니다.</p>
        <ul>
          <li>원서접수 기간: 2023.09.11(월) ~ 09.15(금) 18:00까지</li>
          <li>접수 방법: 인터넷 원서접수</li>
          <li>전형료: 전형별 상이 (모집요강 참조)</li>
        </ul>
        <p>자세한 사항은 첨부파일 및 입학처 홈페이지를 참고하시기 바랍니다.</p>
      `,
      author: "입학관리자",
      authorRole: "ADMISSION_OFFICER",
      viewCount: 1250,
      attachments: [
        {
          attachmentId: 10,
          fileName: "2024학년도_수시모집_원서접수_안내.pdf",
          fileSize: 1024000,
          fileType: "application/pdf",
          fileUrl: "#",
          uploadedAt: "2023-08-20T10:00:00Z",
        },
      ],
      createdAt: "2023-08-20T10:00:00Z",
      updatedAt: "2023-08-20T10:00:00Z",
    },
    {
      postId: 2,
      boardType: "NOTICE",
      title: "2024학년도 수시모집 면접 일정 안내",
      content: `
        <h3>2024학년도 수시모집 면접 일정 안내</h3>
        <p>2024학년도 수시모집 면접 일정을 다음과 같이 안내합니다.</p>
        <ul>
          <li>면접 일자: 2023.11.25(토) ~ 11.26(일)</li>
          <li>면접 장소: 각 단과대학 지정 고사장</li>
          <li>준비물: 수험표, 신분증</li>
        </ul>
        <p>면접 시간 및 장소는 1단계 합격자 발표 시 개별 안내 예정입니다.</p>
      `,
      author: "입학관리자",
      authorRole: "ADMISSION_OFFICER",
      viewCount: 980,
      createdAt: "2023-10-15T11:30:00Z",
      updatedAt: "2023-10-15T11:30:00Z",
    },
    {
      postId: 3,
      boardType: "NOTICE",
      title: "2023학년도 입학설명회 개최 안내",
      content: `
        <h3>2023학년도 입학설명회 개최 안내</h3>
        <p>2023학년도 입학설명회를 다음과 같이 개최합니다.</p>
        <ul>
          <li>일시: 2023.05.20(토) 14:00 ~ 16:00</li>
          <li>장소: 대학 본관 대강당</li>
          <li>내용: 2024학년도 입학전형 안내, 학과 소개, 캠퍼스 투어</li>
          <li>참가 신청: 홈페이지 온라인 신청 (선착순 300명)</li>
        </ul>
        <p>많은 관심과 참여 바랍니다.</p>
      `,
      author: "입학관리자",
      authorRole: "ADMISSION_OFFICER",
      viewCount: 850,
      createdAt: "2023-05-01T09:30:00Z",
      updatedAt: "2023-05-01T09:30:00Z",
    },
  ],
  QNA: [
    {
      postId: 4,
      boardType: "QNA",
      title: "학생부종합전형 자기소개서 작성 문의",
      content: `
        <p>안녕하세요. 2024학년도 수시 학생부종합전형 지원 예정자입니다.</p>
        <p>자기소개서 작성 시 교내 동아리 활동을 중심으로 작성하려고 하는데, 동아리 활동이 전공과 직접적인 연관이 없어도 괜찮을까요?</p>
        <p>또한, 자기소개서 작성 시 유의해야 할 점이 있다면 알려주시면 감사하겠습니다.</p>
      `,
      author: "예비지원자",
      authorRole: "APPLICANT",
      viewCount: 320,
      isAnswered: true,
      answer: `
        <p>안녕하세요. 입학처입니다.</p>
        <p>자기소개서 작성 시 반드시 전공과 직접적인 연관이 있는 활동만 작성해야 하는 것은 아닙니다. 동아리 활동을 통해 배우고 성장한 점, 그리고 그것이 지원 전공 또는 대학 생활에 어떻게 도움이 될 수 있는지를 중심으로 작성하시면 됩니다.</p>
        <p>자기소개서 작성 시 유의사항은 다음과 같습니다:</p>
        <ul>
          <li>구체적인 사례와 경험을 중심으로 작성</li>
          <li>지원 동기와 학업 계획을 명확히 제시</li>
          <li>맞춤법과 문장 구성에 주의</li>
          <li>공인어학성적, 교외 수상실적 등 기재 금지 항목 확인</li>
        </ul>
        <p>추가 문의사항이 있으시면 언제든지 질문해 주세요.</p>
      `,
      createdAt: "2023-07-10T15:20:00Z",
      updatedAt: "2023-07-11T10:30:00Z",
    },
    {
      postId: 5,
      boardType: "QNA",
      title: "수시 학생부교과전형 수능 최저학력기준 문의",
      content: `
        <p>안녕하세요. 2024학년도 수시 학생부교과전형 지원을 고려 중인 학생입니다.</p>
        <p>컴퓨터공학과 지원 시 수능 최저학력기준이 어떻게 되나요? 국어, 수학, 영어, 탐구 중 어떤 과목을 반영하나요?</p>
        <p>또한, 탐구 과목은 몇 과목을 반영하는지도 알려주시면 감사하겠습니다.</p>
      `,
      author: "수험생",
      authorRole: "APPLICANT",
      viewCount: 280,
      isAnswered: true,
      answer: `
        <p>안녕하세요. 입학처입니다.</p>
        <p>2024학년도 수시 학생부교과전형 컴퓨터공학과 지원 시 수능 최저학력기준은 다음과 같습니다:</p>
        <ul>
          <li>국어, 수학, 영어, 탐구(1과목) 중 3개 영역 등급 합 9 이내</li>
          <li>수학 포함 필수</li>
        </ul>
        <p>탐구 과목은 사회/과학 구분 없이 상위 1과목을 반영합니다. 다만, 컴퓨터공학과는 과학탐구 선택을 권장합니다.</p>
        <p>자세한 내용은 모집요강을 참고하시기 바랍니다. 추가 문의사항이 있으시면 언제든지 질문해 주세요.</p>
      `,
      createdAt: "2023-07-15T14:10:00Z",
      updatedAt: "2023-07-16T09:45:00Z",
    },
    {
      postId: 6,
      boardType: "QNA",
      title: "정시 지원 시 수능 반영 방법 문의",
      content: `
        <p>안녕하세요. 정시 지원을 고려 중인 학생입니다.</p>
        <p>경영학과 지원 시 수능 영역별 반영 비율이 어떻게 되나요? 또한, 영어와 한국사는 어떻게 반영되나요?</p>
      `,
      author: "수험생2",
      authorRole: "APPLICANT",
      viewCount: 210,
      isAnswered: false,
      createdAt: "2023-08-05T16:40:00Z",
      updatedAt: "2023-08-05T16:40:00Z",
    },
  ],
  FAQ: [
    {
      postId: 7,
      boardType: "FAQ",
      title: "학생부종합전형과 학생부교과전형의 차이점은 무엇인가요?",
      content: `
        <h3>학생부종합전형과 학생부교과전형의 차이점</h3>
        <p><strong>학생부교과전형</strong>은 주로 교과 성적(내신 등급)을 정량적으로 평가하는 전형입니다. 교과 성적을 중심으로 평가하며, 일부 전형에서는 비교과 활동이나 면접을 반영하기도 합니다.</p>
        <p><strong>학생부종합전형</strong>은 교과 성적뿐만 아니라 학생의 학업 역량, 전공적합성, 인성, 발전가능성 등을 종합적으로 평가하는 전형입니다. 학생부에 기재된 교과 및 비교과 활동, 세부능력 및 특기사항, 독서활동 등을 정성적으로 평가합니다.</p>
        <p>지원자의 성적과 특성, 지원 학과에 따라 유리한 전형이 다를 수 있으므로, 자신의 강점을 잘 살릴 수 있는 전형을 선택하는 것이 중요합니다.</p>
      `,
      author: "입학관리자",
      authorRole: "ADMISSION_OFFICER",
      viewCount: 1500,
      createdAt: "2023-06-01T10:00:00Z",
      updatedAt: "2023-06-01T10:00:00Z",
    },
    {
      postId: 8,
      boardType: "FAQ",
      title: "수시와 정시 지원 전략은 어떻게 세워야 하나요?",
      content: `
        <h3>수시와 정시 지원 전략</h3>
        <p><strong>수시 지원 전략</strong></p>
        <ul>
          <li>내신 성적이 좋은 학생: 학생부교과전형 중심으로 지원 고려</li>
          <li>비교과 활동이 풍부한 학생: 학생부종합전형 중심으로 지원 고려</li>
          <li>논술 능력이 뛰어난 학생: 논술전형 지원 고려</li>
          <li>수능 최저학력기준을 충족할 수 있는지 확인</li>
        </ul>
        <p><strong>정시 지원 전략</strong></p>
        <ul>
          <li>수능 성적을 기반으로 지원 가능 대학 및 학과 파악</li>
          <li>영역별 반영 비율이 자신의 강점과 일치하는 대학 우선 고려</li>
          <li>전년도 입시 결과를 참고하여 안정, 적정, 소신 지원 대학 선정</li>
        </ul>
        <p>수시와 정시는 상호보완적인 관계이므로, 두 전형을 모두 고려한 종합적인 전략 수립이 중요합니다.</p>
      `,
      author: "입학관리자",
      authorRole: "ADMISSION_OFFICER",
      viewCount: 1320,
      createdAt: "2023-06-05T11:30:00Z",
      updatedAt: "2023-06-05T11:30:00Z",
    },
    {
      postId: 9,
      boardType: "FAQ",
      title: "자기소개서는 어떻게 작성해야 하나요?",
      content: `
        <h3>자기소개서 작성 요령</h3>
        <p><strong>자기소개서 작성 시 유의사항</strong></p>
        <ol>
          <li><strong>구체적인 사례 중심으로 작성</strong>: 추상적인 내용보다는 실제 경험과 사례를 중심으로 작성하세요.</li>
          <li><strong>지원 동기와 학업 계획 명확히 제시</strong>: 왜 해당 대학과 학과에 지원하는지, 입학 후 어떤 공부를 하고 싶은지 구체적으로 작성하세요.</li>
          <li><strong>진정성 있는 내용으로 작성</strong>: 과장되거나 거짓된 내용은 피하고, 자신의 실제 경험과 생각을 진솔하게 작성하세요.</li>
          <li><strong>맞춤법과 문장 구성에 주의</strong>: 오탈자나 문법적 오류가 없도록 여러 번 검토하세요.</li>
          <li><strong>금지 사항 확인</strong>: 공인어학성적, 교외 수상실적 등 기재 금지 항목을 확인하고 이를 포함하지 않도록 주의하세요.</li>
        </ol>
        <p>자기소개서는 입학사정관이 지원자를 이해하는 중요한 자료이므로, 충분한 시간을 두고 신중하게 작성하는 것이 좋습니다.</p>
      `,
      author: "입학관리자",
      authorRole: "ADMISSION_OFFICER",
      viewCount: 1150,
      createdAt: "2023-06-10T14:00:00Z",
      updatedAt: "2023-06-10T14:00:00Z",
    },
  ],
}

// 통계 목업 데이터
export const mockStatistics: CounselingStatistics = {
  period: {
    startDate: "2023-07-01",
    endDate: "2023-07-31",
  },
  totalCount: 256,
  byType: [
    {
      type: "온라인 상담",
      count: 150,
      percentage: 58.6,
    },
    {
      type: "전화 상담",
      count: 65,
      percentage: 25.4,
    },
    {
      type: "방문 상담",
      count: 41,
      percentage: 16.0,
    },
  ],
  byDate: [
    { date: "2023-07-01", count: 8 },
    { date: "2023-07-02", count: 5 },
    { date: "2023-07-03", count: 12 },
    { date: "2023-07-04", count: 10 },
    { date: "2023-07-05", count: 9 },
    { date: "2023-07-06", count: 7 },
    { date: "2023-07-07", count: 6 },
    { date: "2023-07-08", count: 4 },
    { date: "2023-07-09", count: 3 },
    { date: "2023-07-10", count: 15 },
    { date: "2023-07-11", count: 13 },
    { date: "2023-07-12", count: 11 },
    { date: "2023-07-13", count: 9 },
    { date: "2023-07-14", count: 8 },
    { date: "2023-07-15", count: 6 },
    { date: "2023-07-16", count: 4 },
    { date: "2023-07-17", count: 14 },
    { date: "2023-07-18", count: 12 },
    { date: "2023-07-19", count: 10 },
    { date: "2023-07-20", count: 9 },
    { date: "2023-07-21", count: 7 },
    { date: "2023-07-22", count: 5 },
    { date: "2023-07-23", count: 3 },
    { date: "2023-07-24", count: 16 },
    { date: "2023-07-25", count: 14 },
    { date: "2023-07-26", count: 12 },
    { date: "2023-07-27", count: 10 },
    { date: "2023-07-28", count: 8 },
    { date: "2023-07-29", count: 6 },
    { date: "2023-07-30", count: 4 },
    { date: "2023-07-31", count: 16 },
  ],
  byCounselor: [
    {
      counselorId: "counselor1",
      counselorName: "김상담",
      count: 85,
    },
    {
      counselorId: "counselor2",
      counselorName: "이상담",
      count: 72,
    },
    {
      counselorId: "counselor3",
      counselorName: "박상담",
      count: 65,
    },
    {
      counselorId: "counselor4",
      counselorName: "최상담",
      count: 34,
    },
  ],
  keywords: [
    {
      keyword: "학생부종합",
      count: 78,
    },
    {
      keyword: "내신 등급",
      count: 65,
    },
    {
      keyword: "수능 최저",
      count: 52,
    },
    {
      keyword: "자기소개서",
      count: 48,
    },
    {
      keyword: "면접",
      count: 42,
    },
    {
      keyword: "전과",
      count: 35,
    },
    {
      keyword: "장학금",
      count: 30,
    },
    {
      keyword: "기숙사",
      count: 25,
    },
  ],
}
