// Quiz module for embryonic development course

class EmbryologyQuiz {
    constructor() {
        this.container = document.getElementById('quizContainer');
        this.submitBtn = document.getElementById('submitQuiz');
        this.resultDiv = document.getElementById('quizResult');
        
        this.questions = [
            {
                id: 1,
                question: "Quel type de segmentation observe-t-on chez les amphibiens ?",
                options: [
                    "Segmentation holoblastique égale",
                    "Segmentation holoblastique inégale",
                    "Segmentation méroblastique superficielle",
                    "Segmentation méroblastique discoïdale"
                ],
                correct: 1,
                explanation: "Les amphibiens présentent une segmentation holoblastique inégale due à la répartition inégale du vitellus dans l'œuf."
            },
            {
                id: 2,
                question: "Quel morphogène maternel est responsable de l'établissement de l'axe antéro-postérieur chez la drosophile ?",
                options: [
                    "Nanos uniquement",
                    "Bicoid uniquement", 
                    "Bicoid et Nanos",
                    "Caudal et Hunchback"
                ],
                correct: 2,
                explanation: "Bicoid (antérieur) et Nanos (postérieur) forment des gradients opposés qui établissent l'axe antéro-postérieur."
            },
            {
                id: 3,
                question: "Dans quelle séquence s'expriment les gènes de segmentation zygotiques chez la drosophile ?",
                options: [
                    "Segmentaires → Paires-règles → Polarité",
                    "Polarité → Segmentaires → Paires-règles",
                    "Paires-règles → Polarité → Segmentaires",
                    "Polarité → Paires-règles → Segmentaires"
                ],
                correct: 3,
                explanation: "La cascade hiérarchique suit l'ordre : gènes de polarité → paires-règles → segmentaires."
            },
            {
                id: 4,
                question: "Quel processus caractérise la gastrulation chez les échinodermes ?",
                options: [
                    "Invagination uniquement",
                    "Ingression uniquement",
                    "Invagination et ingression",
                    "Épibolie"
                ],
                correct: 2,
                explanation: "Les échinodermes utilisent à la fois l'invagination (formation de l'archentéron) et l'ingression (cellules mésenchymateuses)."
            },
            {
                id: 5,
                question: "Qu'est-ce qui caractérise le blastoderme syncytial chez les arthropodes ?",
                options: [
                    "Présence de membranes cellulaires dès les premières divisions",
                    "Noyaux libres dans un cytoplasme commun",
                    "Formation immédiate de blastomères individuels",
                    "Absence totale de divisions nucléaires"
                ],
                correct: 1,
                explanation: "Le blastoderme syncytial contient de nombreux noyaux dans un cytoplasme commun, sans membranes cellulaires initialement."
            },
            {
                id: 6,
                question: "Quelle technique permet de visualiser l'expression des gènes de segmentation ?",
                options: [
                    "Microscopie électronique",
                    "Hybridation in situ",
                    "Western blot",
                    "PCR quantitative"
                ],
                correct: 1,
                explanation: "L'hybridation in situ permet de localiser spatialement l'expression des gènes dans l'embryon."
            },
            {
                id: 7,
                question: "Quel est le rôle principal des morphogènes maternels ?",
                options: [
                    "Initier la segmentation",
                    "Contrôler la gastrulation",
                    "Établir les axes corporels",
                    "Réguler la neurulation"
                ],
                correct: 2,
                explanation: "Les morphogènes maternels créent des gradients de concentration qui définissent les axes corporels de l'embryon."
            },
            {
                id: 8,
                question: "Comment s'appelle le processus de formation des feuillets embryonnaires ?",
                options: [
                    "Segmentation",
                    "Gastrulation", 
                    "Neurulation",
                    "Organogenèse"
                ],
                correct: 1,
                explanation: "La gastrulation est le processus qui transforme la blastula en gastrula avec formation des trois feuillets embryonnaires."
            }
        ];
        
        this.userAnswers = {};
        this.init();
    }
    
    init() {
        this.renderQuiz();
        this.submitBtn.addEventListener('click', () => this.submitQuiz());
        console.log('Quiz module initialized');
    }
    
    renderQuiz() {
        this.container.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.style.animationDelay = `${index * 0.1}s`;
            
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `Question ${question.id}: ${question.question}`;
            questionDiv.appendChild(questionTitle);
            
            const optionsList = document.createElement('ul');
            optionsList.className = 'options';
            
            question.options.forEach((option, optionIndex) => {
                const listItem = document.createElement('li');
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question_${question.id}`;
                radioInput.value = optionIndex;
                radioInput.id = `q${question.id}_option${optionIndex}`;
                
                const label = document.createElement('label');
                label.htmlFor = `q${question.id}_option${optionIndex}`;
                label.textContent = option;
                
                listItem.appendChild(radioInput);
                listItem.appendChild(label);
                optionsList.appendChild(listItem);
                
                // Add event listener for answer tracking
                radioInput.addEventListener('change', () => {
                    this.userAnswers[question.id] = optionIndex;
                    this.updateProgress();
                });
            });
            
            questionDiv.appendChild(optionsList);
            this.container.appendChild(questionDiv);
        });
        
        // Add progress indicator
        this.addProgressIndicator();
    }
    
    addProgressIndicator() {
        const progressDiv = document.createElement('div');
        progressDiv.id = 'quizProgress';
        progressDiv.style.cssText = `
            background: rgba(255, 255, 255, 0.9);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
            border: 2px solid #667eea;
        `;
        progressDiv.innerHTML = `
            <div style="margin-bottom: 10px;">Progression du quiz</div>
            <div id="progressBar" style="
                width: 100%;
                height: 20px;
                background: #f0f0f0;
                border-radius: 10px;
                overflow: hidden;
            ">
                <div id="progressFill" style="
                    width: 0%;
                    height: 100%;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    transition: width 0.3s ease;
                "></div>
            </div>
            <div id="progressText" style="margin-top: 10px; color: #666;">
                0 / ${this.questions.length} questions répondues
            </div>
        `;
        
        this.container.insertBefore(progressDiv, this.container.firstChild);
    }
    
    updateProgress() {
        const answeredCount = Object.keys(this.userAnswers).length;
        const totalCount = this.questions.length;
        const percentage = (answeredCount / totalCount) * 100;
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${answeredCount} / ${totalCount} questions répondues`;
            
            // Enable submit button when all questions are answered
            this.submitBtn.disabled = answeredCount < totalCount;
            if (answeredCount === totalCount) {
                this.submitBtn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
                this.submitBtn.textContent = 'Valider mes réponses ✓';
            }
        }
    }
    
    submitQuiz() {
        if (Object.keys(this.userAnswers).length < this.questions.length) {
            this.showResult('Veuillez répondre à toutes les questions avant de valider.', 'warning');
            return;
        }
        
        const results = this.calculateResults();
        this.displayResults(results);
        this.highlightAnswers();
        
        // Scroll to results
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    calculateResults() {
        let correctAnswers = 0;
        const details = [];
        
        this.questions.forEach(question => {
            const userAnswer = this.userAnswers[question.id];
            const isCorrect = userAnswer === question.correct;
            
            if (isCorrect) {
                correctAnswers++;
            }
            
            details.push({
                questionId: question.id,
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.correct,
                isCorrect: isCorrect,
                explanation: question.explanation,
                options: question.options
            });
        });
        
        const percentage = Math.round((correctAnswers / this.questions.length) * 100);
        
        return {
            correctAnswers,
            totalQuestions: this.questions.length,
            percentage,
            details
        };
    }
    
    displayResults(results) {
        let resultClass = '';
        let resultMessage = '';
        
        if (results.percentage >= 80) {
            resultClass = 'success';
            resultMessage = `Excellent ! ${results.correctAnswers}/${results.totalQuestions} (${results.percentage}%)`;
        } else if (results.percentage >= 60) {
            resultClass = 'warning';
            resultMessage = `Bien ! ${results.correctAnswers}/${results.totalQuestions} (${results.percentage}%)`;
        } else {
            resultClass = 'error';
            resultMessage = `À revoir... ${results.correctAnswers}/${results.totalQuestions} (${results.percentage}%)`;
        }
        
        this.resultDiv.className = resultClass;
        this.resultDiv.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 15px;">${resultMessage}</div>
            <div style="font-size: 1rem; font-weight: normal;">
                ${this.getGradeComment(results.percentage)}
            </div>
        `;
        
        // Add detailed results
        this.addDetailedResults(results);
        
        // Update submit button
        this.submitBtn.textContent = 'Recommencer le quiz';
        this.submitBtn.onclick = () => this.resetQuiz();
    }
    
    getGradeComment(percentage) {
        if (percentage >= 90) {
            return "🏆 Parfait ! Vous maîtrisez parfaitement les concepts d'embryologie.";
        } else if (percentage >= 80) {
            return "🎉 Très bien ! Votre compréhension du développement embryonnaire est solide.";
        } else if (percentage >= 70) {
            return "👍 Bon travail ! Quelques révisions vous permettront d'améliorer vos résultats.";
        } else if (percentage >= 60) {
            return "📚 Correct. Il serait bénéfique de revoir certains concepts clés.";
        } else {
            return "📖 Il est recommandé de réviser le cours avant de reprendre le quiz.";
        }
    }
    
    addDetailedResults(results) {
        const detailsDiv = document.createElement('div');
        detailsDiv.style.cssText = `
            margin-top: 20px;
            text-align: left;
            font-size: 0.9rem;
            background: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 10px;
        `;
        
        detailsDiv.innerHTML = '<h4 style="margin-bottom: 15px; color: #2c3e50;">Détail des réponses :</h4>';
        
        results.details.forEach(detail => {
            const questionDiv = document.createElement('div');
            questionDiv.style.cssText = `
                margin-bottom: 15px;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid ${detail.isCorrect ? '#2ecc71' : '#e74c3c'};
                background: ${detail.isCorrect ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)'};
            `;
            
            questionDiv.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 8px;">
                    ${detail.isCorrect ? '✓' : '✗'} Question ${detail.questionId}
                </div>
                <div style="margin-bottom: 8px; font-size: 0.85rem;">
                    ${detail.question}
                </div>
                <div style="margin-bottom: 5px;">
                    <strong>Votre réponse :</strong> ${detail.options[detail.userAnswer]}
                </div>
                ${!detail.isCorrect ? `
                    <div style="margin-bottom: 5px;">
                        <strong>Bonne réponse :</strong> ${detail.options[detail.correctAnswer]}
                    </div>
                ` : ''}
                <div style="font-style: italic; color: #555; font-size: 0.8rem;">
                    💡 ${detail.explanation}
                </div>
            `;
            
            detailsDiv.appendChild(questionDiv);
        });
        
        this.resultDiv.appendChild(detailsDiv);
    }
    
    highlightAnswers() {
        this.questions.forEach(question => {
            const questionDiv = document.querySelector(`input[name="question_${question.id}"]`).closest('.question');
            const userAnswer = this.userAnswers[question.id];
            const isCorrect = userAnswer === question.correct;
            
            // Add visual feedback to the question
            questionDiv.style.border = `2px solid ${isCorrect ? '#2ecc71' : '#e74c3c'}`;
            questionDiv.style.background = isCorrect ? 'rgba(46, 204, 113, 0.05)' : 'rgba(231, 76, 60, 0.05)';
            
            // Highlight the selected and correct answers
            const options = questionDiv.querySelectorAll('input[type="radio"]');
            options.forEach((option, index) => {
                const label = option.nextElementSibling;
                
                if (index === userAnswer) {
                    // User's answer
                    label.style.background = isCorrect ? '#2ecc71' : '#e74c3c';
                    label.style.color = 'white';
                    label.style.fontWeight = 'bold';
                } else if (index === question.correct && !isCorrect) {
                    // Correct answer (if user was wrong)
                    label.style.background = '#2ecc71';
                    label.style.color = 'white';
                    label.style.fontWeight = 'bold';
                    label.innerHTML += ' ← Bonne réponse';
                }
            });
        });
    }
    
    resetQuiz() {
        this.userAnswers = {};
        this.resultDiv.innerHTML = '';
        this.resultDiv.className = '';
        this.renderQuiz();
        this.submitBtn.textContent = 'Valider mes réponses';
        this.submitBtn.disabled = true;
        this.submitBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        this.submitBtn.onclick = () => this.submitQuiz();
        
        // Scroll back to quiz
        this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    showResult(message, type) {
        this.resultDiv.className = type;
        this.resultDiv.textContent = message;
        
        setTimeout(() => {
            this.resultDiv.innerHTML = '';
            this.resultDiv.className = '';
        }, 3000);
    }
}

// Initialize quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the quiz section
    if (document.getElementById('quizContainer')) {
        const quiz = new EmbryologyQuiz();
    }
});