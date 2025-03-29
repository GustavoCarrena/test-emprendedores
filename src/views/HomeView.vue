<template>
  <div class="card flex justify-center">
    <Toast position="top-center" group="top-center" />
    <Stepper
      class="basis-[50rem]"
      :value="activeStep.toString()"
      linear
      @update:value="handleStepChange"
    >
      <StepList>
        <Step
          v-for="step in steps"
          :key="step.id"
          :class="activeStep === step.id ? 'step' : 'inactive'"
        >
          <template #default>
            <div class="step-content">
              <Knob
                v-model="step.value"
                :size="activeStep === step.id ? 120 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="flex flex-col items-baseline">
                <span>{{ step.title }}</span>
                <span>{{ step.subtitle }}</span>
              </div>
            </div>
          </template>
        </Step>
      </StepList>
      <StepPanels>
        <StepPanel
          v-for="step in steps"
          :key="`panel-${step.id}`"
          :value="step.id.toString()"
        >
          <Questions v-if="data" v-model="payload" :data="filteredQuestions" />
          <div
            class="flex pt-8"
            :class="step.showBack ? 'justify-between' : 'justify-end'"
          >
            <Button
              v-if="step.showBack"
              label="Anterior"
              severity="secondary"
              icon="pi pi-arrow-left"
              :loading="isPending"
              :disabled="isPending"
              @click="handleNavigation(step.id - 1)"
            />
            <Button
              v-if="step.showNext"
              label="Continuar"
              icon="pi pi-arrow-right"
              iconPos="right"
              :loading="isPending"
              :disabled="isPending"
              @click="handleNavigation(step.id + 1)"
            />
            <Button
              v-if="step.submit"
              label="Finalizar"
              icon="pi pi-arrow-right"
              iconPos="right"
              :loading="isPending"
              :disabled="isPending"
              @click="handleSubmit"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Knob from 'primevue/knob'
import Toast from 'primevue/toast'
import Questions from '@/components/questions/Questions.vue'
import { useQuestions } from '@/composables/questions.js'
import { useToast } from 'primevue/usetoast'

const { data, isPending } = useQuestions()
const activeStep = ref(1)
const toast = useToast()

const payload = ref([])

const filteredQuestions = computed(() => {
  return data.value.filter((q) => q.id === activeStep.value) || []
})

const steps = computed(() => {
  if (!data.value || data.value.length === 0) return []
  return data.value.map((step, index) => ({
    id: step.id,
    title: `Eje ${step.id} de ${data.value.length}`,
    subtitle: step.titulo,
    value: index + 1,
    showBack: index !== 0,
    showNext: index !== data.value.length - 1,
    submit: index === data.value.length - 1,
  }))
})

const handleStepChange = (step) => {
  const nextStep = Number(step)
  if (nextStep > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail:
        'Debes seleccionar al menos una opción por pregunta antes de avanzar.',
      life: 3000,
      group: 'top-center',
    })
    return
  }
  activeStep.value = nextStep
}

const handleNavigation = (stepId) => {
  if (stepId > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail:
        'Debes seleccionar al menos una opción por pregunta antes de avanzar.',
      life: 3000,
      group: 'top-center',
    })
    return
  }
  activeStep.value = stepId
}

const handleSubmit = () => {
  let totalQuestions = 0
  data.value.forEach((step) => {
    totalQuestions += step.preguntas.length
  })

  if (payload.value.length !== totalQuestions) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail:
        'Debes seleccionar al menos una opción por pregunta antes de finalizar.',
      life: 3000,
      group: 'top-center',
    })
    return
  }

  console.log('✅ Payload final:', payload.value)
}

const hasSelectedAllAnswers = computed(() => {
  if (!data.value || !filteredQuestions.value) return false
  const currentStepQuestions = filteredQuestions.value[0]?.preguntas || []
  const currentStepAnswers = payload.value.filter((answerId) => {
    return currentStepQuestions.some((question) =>
      question.respuestas.some((answer) => answer.respuesta_id === answerId)
    )
  })
  return currentStepAnswers.length === currentStepQuestions.length
})
</script>

<style scoped lang="scss">
:deep(.p-step-number) {
  display: none;
}

:deep(.p-knob-text) {
  background: blue;
  color: red !important;
}

:deep(.p-stepper-separator) {
  display: none;
}

:deep(.p-toast) {
  @media (max-width: 767px) {
    width: 80% !important;
    left: 5% !important;
    right: 5% !important;
  }
}

.step {
  opacity: 1.3;
  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .step-content {
    @media (max-width: 767px) {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  }
}

.inactive {
  opacity: 0.3;
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
