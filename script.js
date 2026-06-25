// مصفوفة البيانات الذكية - تحتوي على مسائل الكتاب المدرسي بدقة دون إسقاط
const quizData = [
    {
        unit: 1,
        question: "إذا كانت س = { أ ، ب ، ج ، د ، هـ }، ص = { 1 ، 2_، 3 ، 4 }، وكانت ع علاقة ممثلة بالأزواج مرتبة ع = { (أ، 1)، (ب، 3)، (ج، 3)، (هـ، 4) }. ما هو مدى هذه العلاقة؟ (كتاب الرياضيات ص 2)",
        options: [
            "{ 1 ، 3 ، 4 }",
            "{ 1 ، 2_، 3 ، 4 }",
            "{ أ ، ب ، ج ، هـ }",
            "{ 1 ، 3 }"
        ],
        correct: 0,
        steps: "خطوات الشرح بالتفصيل:\n1. المدى هو مجموعة صور عناصر المجال في المجال المقابل (المساقط الثانية).\n2. بالنظر للأزواج المرتبة، المساقط الثانية هي: 1، 3، 3، 4.\n3. عند كتابة المجموعة نحذف التكرار، فيكون المدى = { 1 ، 3 ، 4 }.\n* العنصر 2 لم يكتب لأنه ليس صورة لأي عنصر من س."
    },
    {
        unit: 1,
        question: "إذا كانت س = { أ ، ب ، ج ، د }، ص = { 1 ، 3 ، 5_، 7 ، 9 }. ع علاقة من س إلى ص حيث ع = { (أ، 3)، (ب، 1)، (ج، 9)، (د، 7) }. ما هي صورة العنصر ج؟ (تدريب ص 4)",
        options: [
            "صورة ج هي 3",
            "صورة ج هي 1",
            "صورة ج هي 9",
            "صورة ج هي 7"
        ],
        correct: 2,
        steps: "خطوات الشرح بالتفصيل:\n1. نبحث في بيان العلاقة ع عن الزوج المرتب الذي يبدأ بالعنصر 'ج'.\n2. نجد الزوج المرتب (ج ، 9).\n3. المسقط الثاني (9) يمثل صورة المسقط الأول، إذن صورة ج هي 9."
    },
    {
        unit: 1,
        question: "يقال عن العلاقة من المجموعة س إلى المجموعة ص أنها (تطبيق أو دالة) إذا كان: (مفهوم أساسي ص 5)",
        options: [
            "بعض عناصر س ترتبط بعنصر واحد فقط من ص.",
            "كل عنصر من عناصر س يرتبط بعنصر واحد فقط من عناصر ص.",
            "عناصر ص ترتبط بكل عناصر س.",
            "المدى يساوي المجال المقابل دائماً."
        ],
        correct: 1,
        steps: "تعريف التطبيق (الدالة):\nهو علاقة من س إلى ص بشرط أن كل عنصر من عناصر المجال (س) يخرج منه سهم واحد فقط (أي يرتبط بعنصر واحد فقط) من عناصر المجال المقابل (ص)."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let isAnswerChecked = false;

// دالة تشغيل الاختبار
function initQuiz() {
    isAnswerChecked = false;
    selectedOptionIndex = null;
    
    // التأكد من إظهار بطاقة الأسئلة وإخفاء بطاقة النتيجة
    document.getElementById("quiz-card").style.display = "block";
    document.getElementById("result-card").classList.add("hidden");
    document.getElementById("action-btn").innerText = "تحقق من الإجابة";
    
    displayQuestion();
}

// دالة عرض السؤال والخيارات
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const container = document.getElementById("question-container");
    
    // تحديث شريط التقدم
    const progressPercent = (currentQuestionIndex / quizData.length) * 100;
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;

    // بناء كود HTML للسؤال
    let html = `<p class="question-text">${currentQuestion.question}</p>`;
    html += `<div class="options-list">`;
    
    currentQuestion.options.forEach((option, index) => {
        html += `<div class="option-item" id="opt-${index}" onclick="selectOption(${index})">${option}</div>`;
    });
    
    html += `</div>`;
    html += `<div id="steps-container"></div>`; 
    
    container.innerHTML = html;
}

// دالة اختيار إحدى الإجابات
function selectOption(index) {
    if (isAnswerChecked) return; 
    
    selectedOptionIndex = index;
    
    const items = document.querySelectorAll(".option-item");
    items.forEach(item => item.classList.remove("selected"));
    document.getElementById(`opt-${index}`).classList.add("selected");
}

// دالة التحكم (زر تحقق / زر التالي)
function checkOrNext() {
    if (selectedOptionIndex === null) {
        alert("الرجاء اختيار إجابة أولاً!");
        return;
    }

    if (!isAnswerChecked) {
        isAnswerChecked = true;
        const currentQuestion = quizData[currentQuestionIndex];
        const correctIndex = currentQuestion.correct;
        
        document.getElementById(`opt-${correctIndex}`).classList.add("correct");
        if (selectedOptionIndex !== correctIndex) {
            document.getElementById(`opt-${selectedOptionIndex}`).classList.add("wrong");
        } else {
            score++;
        }
        
        const stepsContainer = document.getElementById("steps-container");
        stepsContainer.innerHTML = `
            <div class="steps-box">
                <h4>💡 شرح ومسار الحل العلمي:</h4>
                <p style="white-space: pre-line;">${currentQuestion.steps}</p>
            </div>
        `;
        
        if (currentQuestionIndex === quizData.length - 1) {
            document.getElementById("action-btn").innerText = "عرض النتيجة النهائية";
        } else {
            document.getElementById("action-btn").innerText = "السؤال التالي ⬅️";
        }
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            isAnswerChecked = false;
            selectedOptionIndex = null;
            document.getElementById("action-btn").innerText = "تحقق من الإجابة";
            displayQuestion();
        } else {
            showResults();
        }
    }
}

// دالة إظهار لوحة النهاية والدرجات
function showResults() {
    document.getElementById("progress-bar").style.width = `100%`;
    document.getElementById("quiz-card").style.display = "none";
    const resultCard = document.getElementById("result-card");
    resultCard.classList.remove("hidden");
    
    document.getElementById("final-score").innerText = `${score} / ${quizData.length}`;
    
    let message = "";
    const percent = (score / quizData.length) * 100;
    if (percent === 100) message = "ممتاز جداً! لقد أجبت على جميع مسائل الكتاب بشكل نموذجي.";
    else if (percent >= 70) message = "أداء رائع! لديك فهم قوي لدرس العلاقات والتطبيقات.";
    else message = "جيد، وننصحك بمراجعة الصفحات المقابلة في كتاب المناهج القومي بخت الرضا لتحسين النتيجة.";
    
    document.getElementById("result-message").innerText = message;
}

// إعادة الاختبار
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    initQuiz();
}

// تفعيل النظام فور تحميل الصفحة
window.onload = initQuiz;
