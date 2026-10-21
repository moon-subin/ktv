/**
 * 한국정책방송원(KTV) 웹 애플리케이션 인터랙션 스크립트
 * 프레임워크 없는 순수 바닐라 JavaScript (더블클릭 단독 실행 완벽 지원)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 네비게이션 스크롤 활성화 (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // 2. 퀵 필터 칩(카테고리별 주요 업무 강조)
  const quickChips = document.querySelectorAll('.chip');
  const roleItems = document.querySelectorAll('.role-item');

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      quickChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterValue = chip.getAttribute('data-filter');

      roleItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // 3. 키워드 검색 기능 (주요 업무 및 프로그램, 뉴스 통합 검색)
  const searchInput = document.getElementById('keywordSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const searchableItems = document.querySelectorAll('.role-item, .news-card, .program-card');

      searchableItems.forEach(card => {
        const textContent = card.innerText.toLowerCase();
        if (keyword === '' || textContent.includes(keyword)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. 뉴스 탭 필터링
  const newsTabs = document.querySelectorAll('.news-tab');
  const newsCards = document.querySelectorAll('.news-card');

  newsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      newsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-news-cat');

      newsCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. 카드 마우스 인터랙션 효과
  const allCards = document.querySelectorAll('.about-card, .trend-card, .program-card, .news-card');
  allCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#1b5cc2';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  // ============================================================
  // 6. "나는 어떤 도움을 받을 수 있을까?" 맞춤형 진단 체크리스트 엔진
  // ============================================================
  const typeDatabase = {
    youth: {
      title: "청년·구직자·사회초년생을 위한 KTV 실속 혜택",
      subtitle: "KTV는 청년 여러분이 정부 지원 제도를 놓치지 않고 꿈을 펼칠 수 있도록 돕습니다.",
      guide: "KTV 유튜브의 청년 전용 쇼츠 및 '청년공감 정책 톡톡' 프로그램을 정기 시청해 보세요.",
      link: "https://www.ktv.go.kr",
      benefits: [
        {
          badge: "금융·자산형성",
          title: "청년도약계좌 & 미래적금 핵심 비교",
          desc: "매달 붓는 청년 전용 저축 상품의 지원 금리와 정부 기여금 자격 요건을 1분 만에 알기 쉽게 정리해 드립니다.",
          linkText: "청년 정책 코너 보기"
        },
        {
          badge: "일자리·취업",
          title: "공공기관 채용 동향 및 직업훈련비 지원",
          desc: "국민내일배움카드, K-디지털 트레이닝 지원금 및 공공부문 청년 인턴 채용 브리핑을 가장 먼저 알려드립니다.",
          linkText: "취업 지원 뉴스 확인"
        },
        {
          badge: "주거 복지",
          title: "청년 주택청약 및 월세 지원 가이드",
          desc: "국토교통부의 청년 전·월세 보증금 대출 및 공공임대주택 입주 자격 조건을 전문가 대담으로 해설합니다.",
          linkText: "주거 혜택 안내 보기"
        }
      ]
    },
    business: {
      title: "소상공인·자영업자·직장인을 위한 맞춤 정책 지원",
      subtitle: "세제 개편, 저리 대출, 경영안정 바우처 등 복잡한 기업·생업 정책을 명쾌하게 풀어냅니다.",
      guide: "정부 부처 합동 비상경제장관회의 브리핑과 소상공인진흥공단 지원 일정을 바로 체크하세요.",
      link: "https://www.ktv.go.kr",
      benefits: [
        {
          badge: "자금·경영안정",
          title: "소상공인 정책자금 및 저리 대환대출 안내",
          desc: "고금리 부담을 낮춰주는 정부 특례보증 대출 지원 시기와 신청 서류, 신청 요령을 단계별로 안내합니다.",
          linkText: "경영안전자금 안내"
        },
        {
          badge: "세무·법률",
          title: "달라지는 부가가치세 및 간이과세 기준 해설",
          desc: "소상공인을 위한 세제 감면 조항과 세무 일정 변동사항을 국세청 브리핑 원문과 함께 제공합니다.",
          linkText: "세무 정책 브리핑"
        },
        {
          badge: "판로·디지털화",
          title: "스마트 상점 구축 & 공공 배달·온라인 입점 지원",
          desc: "중소벤처기업부의 스마트 오더, 키오스크 보급 바우처 등 디지털 전환 국비 지원 사업을 소개합니다.",
          linkText: "스마트 지원 공고"
        }
      ]
    },
    family: {
      title: "학부모·다자녀·어르신을 위한 든든한 생활 복지 지원",
      subtitle: "가족 모두의 안전과 건강, 영유아부터 노후까지 생애주기별 복지 혜택을 찾아드립니다.",
      guide: "'알기 쉬운 정책 포커스' 방송과 보건복지부 브리핑을 통해 우리 가족 수혜금을 확인하세요.",
      link: "https://www.ktv.go.kr",
      benefits: [
        {
          badge: "양육·돌봄",
          title: "부모급여·아동수당 & 늘봄학교 확대 지원",
          desc: "만 0~1세 영아 부모급여 인상분과 초등학생 방과후 늘봄학교 참여 방법 및 지원 내용을 상세히 전합니다.",
          linkText: "돌봄 복지 혜택 보기"
        },
        {
          badge: "어르신 복지",
          title: "기초연금 수급 기준 및 노인 일자리 사업",
          desc: "노후 기초연금 지급액 기준과 지자체별 실버 일자리·사회활동 지원 사업 신청 절차를 친절하게 안내합니다.",
          linkText: "시니어 정책 정보"
        },
        {
          badge: "의료·건강",
          title: "국민건강보험 본인부담 완화 및 검진 주기",
          desc: "암 검진, 치매 안심센터 지원, 필수 의료 수가 개편 등 국민 건강과 직결된 보건의료 혜택을 다룹니다.",
          linkText: "건강 복지 뉴스"
        }
      ]
    },
    researcher: {
      title: "연구자·학생·크리에이터를 위한 공공 영상 자산 무료 개방",
      subtitle: "대한민국 역사 70여 년의 소중한 영상 아카이브를 저작권 걱정 없이 열람·활용하세요.",
      guide: "KTV 영상 아카이브 포털에서 고화질 '대한뉴스'와 국가 기록 영상물을 무료 다운로드하세요.",
      link: "https://www.ktv.go.kr",
      benefits: [
        {
          badge: "역사 아카이브",
          title: "대한뉴스 4K 디지털 복원 영상 무료 이용",
          desc: "1950년대부터 축적된 국가 근현대사 기록 필름을 논문, 교육 자료, 다큐멘터리 제작에 공공누리(KOGL)로 무료 활용할 수 있습니다.",
          linkText: "영상 아카이브실 바로가기"
        },
        {
          badge: "학술·연구",
          title: "역대 정부 국정 기록 및 백서 영상 열람",
          desc: "주요 정부 정책의 입안 과정과 국가 행사 연설문 실시간 녹취록·비디오 데이터를 학술 연구용으로 제공합니다.",
          linkText: "국정 사료 데이터베이스"
        },
        {
          badge: "창작 지원",
          title: "공공 영상 라이브러리 및 B-roll 소스 제공",
          desc: "대한민국의 문화유산, 자연경관, 미래 산업 인프라 고화질 공공 영상을 콘텐츠 창작자에게 개방합니다.",
          linkText: "공공 영상 라이브러리"
        }
      ]
    },
    civic: {
      title: "일반 시민과 국정 참여자를 위한 열린 소통 창구",
      subtitle: "국민의 알 권리를 100% 보장하고, 국민 여러분의 목소리를 국정에 직접 반영합니다.",
      guide: "KTV 생중계 ON-AIR로 가감 없는 국정 발표를 보고, 시청자 참여 코너에 의견을 남겨보세요.",
      link: "https://www.ktv.go.kr",
      benefits: [
        {
          badge: "무왜곡 생중계",
          title: "국무회의 & 부처 장·차관 브리핑 원문 시청",
          desc: "어떠한 주관적 편집 없이 정부 부처 브리핑 룸을 실시간으로 연결하여 국민이 직접 판단할 수 있는 팩트를 전합니다.",
          linkText: "실시간 ON-AIR 시청"
        },
        {
          badge: "시청자 참여",
          title: "‘정책 제보’ 및 시청자 위원회 참여",
          desc: "일상에서 겪은 불합리한 규제나 정책 개선 건의를 KTV 취재팀에 직접 제보하고 방송으로 공론화할 수 있습니다.",
          linkText: "시청자 제보 게시판"
        },
        {
          badge: "안전 조기경보",
          title: "재난재해 24시간 특별 생방송 체제",
          desc: "태풍, 폭우, 지진 등 국가 위기 상황 시 행정안전부와 연동된 실시간 피해 상황 및 국민 대피 수칙을 안내합니다.",
          linkText: "재난 안전 방송 보기"
        }
      ]
    }
  };

  const interestAddons = {
    subsidy: {
      badge: "선택 추가 혜택",
      title: "💡 나만의 숨은 정부 보조금·지원금 자동 알림",
      desc: "정부24 및 보조금24와 연계하여 내가 놓치고 있던 연령·가구별 맞춤 복지 혜택을 KTV 정책 뉴스를 통해 주기적으로 안내받으실 수 있습니다."
    },
    realtime: {
      badge: "선택 추가 혜택",
      title: "📡 부처 합동 브리핑 무편집 원문 영상 지원",
      desc: "편집된 뉴스 대신 각 부처 대변인의 발표와 질의응답 전체를 KTV 웹사이트와 온에어에서 실시간으로 직접 확인하실 수 있습니다."
    },
    safety: {
      badge: "선택 추가 혜택",
      title: "🚨 24시간 긴급 재난 안전 행동요령 상시 송출",
      desc: "기상청, 소방청과 직결된 대피 행동요령과 위험 지역 상황판을 실시간 자막과 수어로 빠르게 전파해 안전을 지켜드립니다."
    },
    video: {
      badge: "선택 추가 혜택",
      title: "🎞️ 4K 리마스터링 국가 기록 영상물 자유 열람",
      desc: "대한민국 70년의 문화·역사 필름을 저작권 분쟁 없이 교육·창작·연구에 무료로 다운로드하여 활용할 수 있습니다."
    },
    voice: {
      badge: "선택 추가 혜택",
      title: "🗣️ 정책 토론 프로그램 방청 및 시청자 발언권",
      desc: "‘청년공감 정책 톡톡’ 등 열린 토론 프로그램 패널로 직접 참가하여 장관 및 정책 입안자에게 직접 질문할 수 있습니다."
    },
    shortform: {
      badge: "선택 추가 혜택",
      title: "📱 유튜브 쇼츠 & 1분 정책 요약 서비스",
      desc: "바쁜 일상 속에서도 스마트폰으로 60초 만에 핵심 정부 제도를 이해할 수 있는 숏폼 비디오를 매일 제공합니다."
    }
  };

  const btnDiagnose = document.getElementById('btnDiagnose');
  const btnReset = document.getElementById('btnResetChecker');
  const resultTitle = document.getElementById('resultTitle');
  const resultSubtitle = document.getElementById('resultSubtitle');
  const benefitList = document.getElementById('benefitList');
  const guideComment = document.getElementById('guideComment');
  const resultArea = document.getElementById('resultArea');

  function renderDiagnosis() {
    const selectedRadio = document.querySelector('input[name="userType"]:checked');
    const selectedType = selectedRadio ? selectedRadio.value : 'youth';
    const checkedInterests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);

    const typeData = typeDatabase[selectedType] || typeDatabase.youth;

    if (resultTitle) resultTitle.innerText = typeData.title;
    if (resultSubtitle) resultSubtitle.innerText = typeData.subtitle;
    if (guideComment) guideComment.innerText = typeData.guide;

    if (benefitList) {
      benefitList.innerHTML = '';

      // 기본 유형별 혜택 카드 렌더링
      typeData.benefits.forEach(b => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.innerHTML = `
          <div class="benefit-badge">${b.badge}</div>
          <h4>${b.title}</h4>
          <p>${b.desc}</p>
          <a href="https://www.ktv.go.kr" target="_blank" rel="noopener noreferrer" class="benefit-link">
            ${b.linkText} →
          </a>
        `;
        benefitList.appendChild(card);
      });

      // 체크리스트에서 추가 선택한 혜택 카드 렌더링
      checkedInterests.forEach(interestKey => {
        const addon = interestAddons[interestKey];
        if (addon) {
          const card = document.createElement('div');
          card.className = 'benefit-card custom-addon';
          card.style.borderLeft = '4px solid #0b3c88';
          card.innerHTML = `
            <div class="benefit-badge" style="background:#e0e7ff; color:#0b3c88;">${addon.badge}</div>
            <h4>${addon.title}</h4>
            <p>${addon.desc}</p>
            <a href="https://www.ktv.go.kr" target="_blank" rel="noopener noreferrer" class="benefit-link">
              관련 서비스 바로 이용하기 →
            </a>
          `;
          benefitList.appendChild(card);
        }
      });
    }

    if (resultArea) {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (btnDiagnose) {
    btnDiagnose.addEventListener('click', renderDiagnosis);
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const youthRadio = document.querySelector('input[name="userType"][value="youth"]');
      if (youthRadio) youthRadio.checked = true;

      const defaultChecks = ['subsidy'];
      document.querySelectorAll('input[name="interests"]').forEach(cb => {
        cb.checked = defaultChecks.includes(cb.value);
      });

      renderDiagnosis();
    });
  }

  // 초기 1회 자동 렌더링
  renderDiagnosis();
});
