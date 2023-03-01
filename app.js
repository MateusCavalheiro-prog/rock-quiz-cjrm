const correctAnswers = ['B', 'B', 'B', 'B']
const form = document.querySelector('.quiz-form')
const quizResultPopup = document.querySelector('.wrapper-card')


const getUserAnswers = form => {
   return [
      form.inputQuestion1.value,
      form.inputQuestion2.value,
      form.inputQuestion3.value,
      form.inputQuestion4.value
   ]
}

const scoreMessage = score =>  { 
   return {
      0: 'Mais sorte da proxima vez! você não acertou nenhuma =(',
      25: 'Parabéns você acertou 25%!',
      50: 'Parabéns você acertou 50%!',
      75: 'Parabéns você acertou 75%!',
      100: 'Exelente você acertou 100%!',
   }[score]
}

const showPopup = (popup, removeClass, addClass, scoreFeedback) => {
   popup.classList.remove(removeClass)
   popup.classList.add(addClass)

   popup.innerHTML = `
    <div class="card" style="width: 28rem;">
      <button class="close-card">X</button>
      <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title text-center">${scoreFeedback}</h5>
        <a href="#" class="btn btn-primary">Reiniciar</a>
      </div>
    </div>
   `
}

const showResultQuiz =  event => {
   event.preventDefault()

   const userAnswers = getUserAnswers(form)
   let score = 0
   
   userAnswers.forEach((useranswer, index) => {
      const correctAnswer = useranswer === correctAnswers[index]

      if (correctAnswer) {
         score += 25
      }
   })
   
   const scoreFeedback = scoreMessage(score)
   
   showPopup(quizResultPopup, 'd-none', 'd-flex', scoreFeedback)
}

const removePopup =  event => {
   const elementPopup = event.target.classList[0]
   const closePopup = elementPopup === 'btn' || elementPopup === 'close-card' || elementPopup === 'wrapper-card'
   
   if (closePopup) {
      quizResultPopup.classList.remove('d-flex')
      quizResultPopup.classList.add('d-none')

      form.reset()
   }
}

form.addEventListener('submit',showResultQuiz)
quizResultPopup.addEventListener('click',removePopup)
