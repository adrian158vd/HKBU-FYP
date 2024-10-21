<script setup>

import { ref, onMounted , watch } from "vue";

const data = ref([]);
const total = ref(0);
const loading = ref(false);
const sortField = ref("vote_count");
const sortOrder = ref("desc");
const defaultSortOrder = ref("desc");
const page = ref(1);
const perPage = ref(20);

const loadAsyncData = () => {
    const params = [
        //"api_key=bb6f51bef07465653c3e553d6ab161a8",
        //"language=en-US",
        //"include_adult=false",
        // "include_video=false",
        `email=${search.value}`,
        `sort_by=${sortField.value}.${sortOrder.value}`,
        `page=${page.value}`,
    ].join("&");
    loading.value = true;
    fetch(`/api/bookings?${params}`)
        .then((response) => response.json())
        .then((result) => {
            // api.themoviedb.org manage max 1000 pages
            let currentTotal = result.total;
            // if (result.total_results / perPage.value > 100)
            //     currentTotal = perPage.value * 100;

            total.value = currentTotal;
            data.value = result.bookings.map((item) => {
                // item.release_date = item.release_date
                //     ? item.release_date.replace(/-/g, "/")
                //     : null;
                return item;
            });
            // cap results for usability
            // if (data.value.length > 10) data.value = data.value.slice(0, 5);
            loading.value = false;
        })
        .catch((error) => {
            data.value = [];
            total.value = 0;
            loading.value = false;
            throw error;
        });
};

/*
 * Handle page-change event
 */
const onPageChange = (p) => {
    page.value = p;
    loadAsyncData();
};

/*
 * Handle sort event
 */
const onSort = (field, order) => {
    sortField.value = field;
    sortOrder.value = order;
    loadAsyncData();
};

/*
 * Type style in relation to the value
 */
const type = (value) => {
    const number = parseFloat(value);
    if (number < 6) {
        return "is-danger";
    } else if (number >= 6 && number < 8) {
        return "is-warning";
    } else if (number >= 8) {
        return "is-success";
    }
};

onMounted(() => {
    loadAsyncData();
});

const search = ref("");

watch(() => search.value, () => {
    loadAsyncData();
});

</script>


<template>

    <section>
        <input class="form-control" v-model="search" placeholder="Search..." />
        <o-table :data="data" :loading="loading" paginated backend-pagination :total="total" :per-page="perPage"
            aria-next-label="Next page" aria-previous-label="Previous page" aria-page-label="Page"
            aria-current-label="Current page" backend-sorting :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]" @page-change="onPageChange" @sort="onSort">
            <o-table-column v-slot="props" field="email" label="email" sortable>
            <RouterLink :to="`/booking/${props.row._id}`"> {{ props.row.email }} </RouterLink>
            </o-table-column>
            <o-table-column v-slot="props" field="numTickets" label="numTickets" numeric sortable>
                <span class="tag" :class="type(props.row.vote_average)">
                    {{ props.row.numTickets }}
                </span>
            </o-table-column>
            <o-table-column v-slot="props" field="superhero" label="superhero" numeric sortable>
                {{ props.row.superhero }}
            </o-table-column>
            <o-table-column v-slot="props" field="modifiedAt" label="modifiedAt" sortable centered>
                {{
                    props.row.modifiedAt
                    ? new Date(props.row.createdAt).toLocaleDateString()
                    : "unknown"
                }}
            </o-table-column>
            <o-table-column v-slot="props" label="payment" width="500">
                {{ props.row.payment }}
            </o-table-column>
        </o-table>
    </section>
</template>