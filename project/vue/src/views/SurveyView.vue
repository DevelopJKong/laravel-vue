<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survey" }}
                </h1>
            </div>
        </template>

        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!--Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Image</label
                        >
                        <div class="mt-1 flex-items-center">
                            <img
                                v-if="model.image"
                                :src="model.image"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                <svg
                                    class="h-full w-full text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </span>
                            <button
                                type="button"
                                class="relative oml-5 bg-white py-1 px-3 ml-5 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    type="file"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <!--/Image -->
                    <!--Title -->
                    <div>
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-700"
                            >Title</label
                        >
                        <input
                            type="text"
                            name="title"
                            id="title"
                            v-model="model.title"
                            autocomplete="survey_title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/Title -->

                    <!--Description -->
                    <div>
                        <label
                            for="about"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <div class="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                row="3"
                                v-model="model.description"
                                autocomplete="survey_description"
                                placeholder="Describe your survey"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            >
                            </textarea>
                        </div>
                    </div>
                    <!--/Description -->

                    <!-- Expire Date -->
                    <div>
                        <label
                            for="expire_date"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Expire Date
                        </label>
                        <input
                            type="date"
                            name="expire_date"
                            id="expire_date"
                            v-model="model.expire_date"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ Expire Date -->
                    <!-- Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                id="statud"
                                name="status"
                                type="checkbox"
                                v-model="model.status"
                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                        </div>
                        <div class="ml-3 text-sm">
                            <label
                                for="status"
                                class="font-medium text-gray-700"
                            >
                                Active
                            </label>
                        </div>
                    </div>
                    <!--/ Status -->
                </div>
                <!-- Survey Field-->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3
                        class="text-2x1 font-semibold flex items-center justify-between"
                    >
                        Questions
                        <!--Add new question -->
                        <button
                            type="button"
                            @click="addQuestion()"
                            class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 bg-gray-600 hover-bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 pr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add Questtion
                        </button>
                    </h3>
                    <div
                        v-if="!model.questions.length"
                        class="text-center text-gray-600"
                    >
                        You don't have any questions created
                    </div>
                    <div
                        v-for="(question, index) in model.questions"
                        :key="question.id"
                    >
                        <QuestionEditor
                            :question="question"
                            :index="index"
                            @change="questionChange"
                            @addQuestion="addQuestion"
                            @deleteQuestion="deleteQuestion"
                        />
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import store from "../store";
import { ref } from "vue";
import { useRoute } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const route = useRoute();

//Create empty survey
let model = ref({
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
});

function deleteSurvey(survey) {
    if (
        confirm(
            `Are you sure you want to delete this survey? Operation can't be undone!!`
        )
    ) {
        store.dispatch("deleteSurvey", survey.id).then(() => {
            store.dispatch("getSurveys");
        });
    }
}
</script>
