// News Data Service (Simulated Database)
const NewsService = {
  data: [
    { id: 1, category: "economy", subcategory: "주식/증시", title: "뉴욕 증시, 연준 금리 결정 앞두고 혼조세", excerpt: "투자자들의 관망세가 지속되는 가운데 기술주 중심의 나스닥은 소폭 상승 마감했다.", date: "2025-12-14", views: 1240 },
    { id: 2, category: "economy", subcategory: "부동산", title: "강남권 초고가 아파트 거래량 3개월 연속 증가", excerpt: "규제 완화 기대감과 똘똘한 한 채 선호 현상이 맞물려 신고가 경신이 이어지고 있다.", date: "2025-12-13", views: 980 },
    { id: 3, category: "politics", subcategory: "외교/통일", title: "한미일 정상회담, 새로운 안보 협력 체계 발표", excerpt: "3국 정상은 캠프 데이비드 정신을 계승한 포괄적 안보 협력 강화에 합의했다.", date: "2025-12-15", views: 3500 },
    { id: 4, category: "society", subcategory: "교육/복지", title: "AI 디지털 교과서 도입, 교육 현장의 변화와 과제", excerpt: "2026년 전면 도입을 앞두고 교사 연수 및 인프라 확충이 시급한 과제로 떠올랐다.", date: "2025-12-12", views: 890 },
    { id: 5, category: "sports", subcategory: "축구", title: "손흥민, 프리미어리그 통산 150호골 달성", excerpt: "아시아 선수 최초의 대기록을 작성하며 토트넘의 레전드로 입지를 굳혔다.", date: "2025-12-14", views: 5600 },
    { id: 6, category: "economy", subcategory: "기업분석", title: "삼성전자, 차세대 HBM 반도체 양산 성공", excerpt: "AI 칩 시장의 게임 체인저가 될 5세대 HBM3E 12단 제품 출하를 시작했다.", date: "2025-12-15", views: 2100 },
    { id: 7, category: "politics", subcategory: "선거/정치인", title: "총선 앞두고 제3지대 정당 창당 움직임 가속화", excerpt: "거대 양당 구조 타파를 기치로 내건 신당 창당 준비위원회가 공식 출범했다.", date: "2025-12-11", views: 1500 },
    { id: 8, category: "society", subcategory: "환경/에너지", title: "기후 위기 대응을 위한 탄소 중립 로드맵 수정안", excerpt: "산업계의 현실적인 부담을 고려하여 감축 목표 달성 시기를 일부 조정했다.", date: "2025-12-13", views: 760 },
    { id: 9, category: "sports", subcategory: "e스포츠", title: "T1, 롤드컵 2연패 달성하며 왕조 재건", excerpt: "페이커 이상혁 선수는 통산 5번째 우승컵을 들어올리며 e스포츠 역사를 새로 썼다.", date: "2025-12-10", views: 8900 },
    { id: 10, category: "economy", subcategory: "금융정책", title: "한국은행, 기준금리 0.25%p 인하 단행", excerpt: "경기 부양을 위한 선제적 조치로 1년 만에 금리 인하 사이클로 진입했다.", date: "2025-12-15", views: 3200 }
  ],

  subcategories: {
    economy: ["주식/증시", "부동산", "금융정책", "기업분석", "경제지표"],
    politics: ["국회/정당", "외교/통일", "행정/공무원", "선거/정치인"],
    society: ["교육/복지", "범죄/사고", "환경/에너지", "교통/인프라"],
    sports: ["축구", "야구", "배구", "골프", "e스포츠"]
  },

  getAll() {
    return this.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getByCategory(category) {
    if (category === 'all') return this.getAll();
    return this.data.filter(item => item.category === category).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  search(query) {
    return this.data.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  },

  add(item) {
    const newId = Math.max(...this.data.map(d => d.id)) + 1;
    this.data.unshift({ ...item, id: newId, date: new Date().toISOString().split('T')[0], views: 0 });
    return this.getAll();
  }
};

// State Management
const state = {
  currentSection: 'home',
  currentNewsCategory: 'all',
  isRecording: false,
  questions: [
    "불확실한 상황에서 리더십을 발휘했던 경험을 말씀해 주세요.",
    "지속 가능한 럭셔리에 대한 귀하의 철학은 무엇입니까?",
    "중대한 협상 상황에서의 압박감을 어떻게 관리하십니까?",
    "최근 해결했던 복잡한 문제와 그 해결 과정에 대해 설명해 주세요."
  ],
  currentQuestionIndex: 0
};

// DOM Elements
const app = {
  navBtns: document.querySelectorAll('.nav-btn'),
  sections: document.querySelectorAll('.section'),
  newsGrid: document.getElementById('news-grid'),
  newsFilters: document.querySelectorAll('.filter-btn'),
  newsSearch: document.getElementById('news-search-input'),
  questionText: document.getElementById('current-question'),
  recordBtn: document.getElementById('start-record-btn'),
  nextQuestionBtn: document.getElementById('next-question-btn'),
  recordingStatus: document.getElementById('recording-status'),
  
  // Admin Elements
  adminToggleBtn: document.getElementById('admin-toggle-btn'),
  adminModal: document.getElementById('admin-modal'),
  closeModalBtn: document.querySelector('.close-modal'),
  adminSubmitBtn: document.getElementById('admin-submit-btn'),
  adminCategorySelect: document.getElementById('admin-category'),
  adminSubcategorySelect: document.getElementById('admin-subcategory'),

  // Analysis Elements
  analysisTabs: document.querySelectorAll('.tab-btn'),
  analysisViews: document.querySelectorAll('.analysis-view'),
  
  init() {
    this.setupNavigation();
    this.renderNews();
    this.setupPractice();
    this.setupGlobalActions();
    this.setupNewsFeatures();
    this.setupAdmin();
    this.setupAnalysisTabs();
  },

  setupAnalysisTabs() {
    this.analysisTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // Toggle Tabs
        this.analysisTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle Views
        this.analysisViews.forEach(view => {
          view.classList.remove('active');
          if (view.id === `view-${tab}`) {
            view.classList.add('active');
            
            // Trigger Animation if Growth View
            if (tab === 'growth') {
              this.animateGrowthChart();
            }
          }
        });
      });
    });
  },

  animateGrowthChart() {
    // Simple reset and animate for visual effect
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
      const originalHeight = bar.style.height;
      bar.style.height = '0%';
      setTimeout(() => {
        bar.style.height = originalHeight;
      }, 100);
    });
  },

  setupNewsFeatures() {
    // Filter Buttons
    this.newsFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.newsFilters.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.currentNewsCategory = e.target.dataset.category;
        this.renderNews();
      });
    });

    // Search
    if (this.newsSearch) {
      this.newsSearch.addEventListener('input', (e) => {
        const query = e.target.value;
        const results = NewsService.search(query);
        this.renderNews(results);
      });
    }
  },

  renderNews(customData = null) {
    let newsData = customData;
    if (!newsData) {
      newsData = NewsService.getByCategory(state.currentNewsCategory);
    }

    if (this.newsGrid) {
      if (newsData.length === 0) {
        this.newsGrid.innerHTML = '<p style="text-align:center; color:#888; grid-column:1/-1;">해당하는 뉴스가 없습니다.</p>';
        return;
      }

      this.newsGrid.innerHTML = newsData.map(news => {
        const categoryMap = { economy: '경제', politics: '정치', society: '사회', sports: '스포츠' };
        return `
        <div class="news-card">
          <div class="news-meta">
            <span class="news-category">${categoryMap[news.category]}</span>
            <span class="news-date">${news.date}</span>
          </div>
          <h3 class="news-headline">${news.title}</h3>
          <p class="news-excerpt">${news.excerpt}</p>
          <span class="news-subcat">${news.subcategory}</span>
        </div>
      `}).join('');
    }
  },

  setupAdmin() {
    // Toggle Modal
    if (this.adminToggleBtn) {
      this.adminToggleBtn.addEventListener('click', () => {
        this.adminModal.classList.remove('hidden');
        this.updateAdminSubcategories();
      });
    }

    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => {
        this.adminModal.classList.add('hidden');
      });
    }

    // Dynamic Subcategories
    if (this.adminCategorySelect) {
      this.adminCategorySelect.addEventListener('change', () => {
        this.updateAdminSubcategories();
      });
    }

    // Submit New News
    if (this.adminSubmitBtn) {
      this.adminSubmitBtn.addEventListener('click', () => {
        const title = document.getElementById('admin-title').value;
        const excerpt = document.getElementById('admin-excerpt').value;
        const category = this.adminCategorySelect.value;
        const subcategory = this.adminSubcategorySelect.value;

        if (title && excerpt) {
          NewsService.add({ title, excerpt, category, subcategory });
          this.renderNews();
          this.adminModal.classList.add('hidden');
          // Reset form
          document.getElementById('admin-title').value = '';
          document.getElementById('admin-excerpt').value = '';
          alert('뉴스가 성공적으로 발행되었습니다.');
        } else {
          alert('모든 필드를 입력해주세요.');
        }
      });
    }
  },

  updateAdminSubcategories() {
    const category = this.adminCategorySelect.value;
    const subs = NewsService.subcategories[category];
    this.adminSubcategorySelect.innerHTML = subs.map(sub => `<option value="${sub}">${sub}</option>`).join('');
  },

  setupNavigation() {
    this.navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        this.navigateTo(target);
      });
    });
  },

  navigateTo(targetId) {
    // Update State
    state.currentSection = targetId;

    // Update UI (Sections)
    this.sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetId) {
        section.classList.add('active');
      }
    });

    // Update UI (Nav)
    this.navBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.target === targetId) {
        btn.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setupGlobalActions() {
    // Expose navigateTo to window for inline calls (e.g., CTA button)
    window.app = {
      navigateTo: (t) => this.navigateTo(t)
    };
  },

  setupPractice() {
    if (this.recordBtn) {
      this.recordBtn.addEventListener('click', () => this.toggleRecording());
    }
    if (this.nextQuestionBtn) {
      this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
    }
  },

  toggleRecording() {
    state.isRecording = !state.isRecording;
    
    if (state.isRecording) {
      this.recordBtn.innerHTML = '<span class="icon">■</span> 녹음 종료';
      this.recordBtn.classList.add('recording');
      this.recordingStatus.classList.remove('hidden');
    } else {
      this.recordBtn.innerHTML = '<span class="icon">●</span> 녹음 시작';
      this.recordBtn.classList.remove('recording');
      this.recordingStatus.classList.add('hidden');
      
      // Simulate Processing
      const originalText = this.recordBtn.innerHTML;
      this.recordBtn.innerHTML = '분석 중...';
      this.recordBtn.disabled = true;

      setTimeout(() => {
        this.generateAnalysis();
        this.navigateTo('analysis');
        
        // Reset Button
        this.recordBtn.innerHTML = originalText;
        this.recordBtn.disabled = false;
        
        // Switch to dashboard tab
        document.querySelector('.tab-btn[data-tab="dashboard"]').click();
      }, 1500);
    }
  },
  
  generateAnalysis() {
    // Simulate AI Scoring Logic with slight randomization
    const baseScore = 85;
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const totalScore = random(88, 99);
    const vocabScore = random(85, 98);
    const persuasionScore = random(85, 98);
    const stabilityScore = random(90, 100);
    
    // Update DOM
    const totalEl = document.getElementById('score-total');
    if (totalEl) totalEl.innerHTML = `${totalScore}<span class="unit">/100</span>`;
    
    const barEl = document.getElementById('score-bar-fill');
    if (barEl) barEl.style.width = `${totalScore}%`;
    
    const vocabEl = document.getElementById('score-vocab');
    if (vocabEl) vocabEl.textContent = vocabScore;
    
    const persEl = document.getElementById('score-persuasion');
    if (persEl) persEl.textContent = persuasionScore;
    
    const stabEl = document.getElementById('score-stability');
    if (stabEl) stabEl.textContent = stabilityScore;
    
    // Logic Score is static for now or random letter
    const logicGrades = ['A+', 'A', 'A-'];
    const logicEl = document.getElementById('score-logic');
    if (logicEl) logicEl.textContent = logicGrades[random(0, 2)];
  },
  
  nextQuestion() {
    state.currentQuestionIndex = (state.currentQuestionIndex + 1) % state.questions.length;
    this.questionText.style.opacity = 0;
    
    setTimeout(() => {
      this.questionText.textContent = state.questions[state.currentQuestionIndex];
      this.questionText.style.opacity = 1;
    }, 300);
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
