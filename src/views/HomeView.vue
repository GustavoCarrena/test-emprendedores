<template>
  <div v-if="!showResults" class="card flex justify-center">
    <Toast
      position="top-center"
      group="top-center"
      style="width: 70vw; max-width: 400px"
    />
    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      :closable="false"
      :dismissableMask="false"
      :closeOnEscape="false"
      :style="{ width: '40vw' }"
    >
      <template #header>
        <div class="flex justify-baseline items-center gap-2">
          <i class="pi pi-check-circle" style="color: green"></i>
          <div class="font-semibold">¡Test de Emprendedores completado!</div>
        </div>
      </template>

      <div class="flex flex-col">
        <div>Muchas gracias por participar</div>
        <div>
          Recordá que una vez finalizado el test, no podrás cambiar los
          resultados
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
            label="Cancelar"
            severity="secondary"
            outlined
            @click="dialogVisible = false"
          />
          <Button
            label="Ver resultados"
            :loading="isResultsPending"
            :disabled="isResultsPending"
            @click="handleDialogAccept"
          />
        </div>
      </template>
    </Dialog>
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
            <div class="knob-content">
              <Knob
                v-model="step.value"
                :size="activeStep === step.id ? 120 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="knob-title">
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
          class="step-pannel"
        >
          <Questions v-if="data" v-model="payload" :data="filteredQuestions" />
          <div
            class="flex px-8 pt-8"
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
              @click="handleConfirm()"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
  <ResultsView v-else :results :data />
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import Knob from 'primevue/knob'
import Toast from 'primevue/toast'
import Questions from '@/components/questions/Questions.vue'
import { useQuestions } from '@/composables/questions.js'
import { useResults } from '@/composables/results.js'
import ResultsView from './ResultsView.vue'
import { warningMessageContent } from '@/constants/messages/messages'

const { data, isPending } = useQuestions()
const {
  data: results,
  isPending: isResultsPending,
  fetchResults,
} = useResults()
const activeStep = ref(1)
const toast = useToast()
//cambiar a false
const showResults = ref(false)
const dialogVisible = ref(false)
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
    toast.add(warningMessageContent)
    return
  }
  activeStep.value = nextStep
}

const handleNavigation = (stepId) => {
  if (stepId > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add(warningMessageContent)
    return
  }
  activeStep.value = stepId
}

const handleSubmit = async () => {
  let totalQuestions = 0
  data.value.forEach((step) => {
    totalQuestions += step.preguntas.length
  })

  if (payload.value.length !== totalQuestions) {
    toast.add(warningMessageContent)
    return
  }
  console.log('✅ Payload final:', payload.value)
  await getResults()
}

const getResults = async () => {
  try {
    await fetchResults(payload.value)
    showResults.value = true
  } catch (error) {
    console.log(error)
  }
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

const handleConfirm = () => {
  dialogVisible.value = true
}

const handleDialogAccept = () => {
  dialogVisible.value = false
  handleSubmit()
}
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .knob-content {
    @media (max-width: 767px) {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      width: 95vw;
      padding: 0 0.5rem;
      .knob-title {
        font-weight: 600;
        @media (max-width: 767px) {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: baseline;
        }
      }
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
