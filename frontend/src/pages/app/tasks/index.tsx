import { AppLayout } from "@/components/layout/app";
import { LocalQueryLoader } from "@/components/query_loader";
import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  SegmentedControl,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { gateServer } from "@/configs/gate_server";
import { gateTan } from "@/configs/gate_tan";
import { For, Show } from "@folie/cobalt/components";
import { PaginationRange } from "@/components/pagination_range";
import { SimplePagination } from "@/components/simple_pagination";
import { useRouter } from "next/router";
import { DotProp } from "@folie/lib";
import {
  IconPlus,
  IconRefresh,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { ICON_SIZE } from "@folie/cobalt";
import { notifications } from "@mantine/notifications";
import { taskCrumbs } from "@/lib/crumbs";

export const getServerSideProps = gateServer.checkpoint();

export default function Page() {
  const router = useRouter();

  const { body, query, setBody } = gateTan.useList({
    endpoint: "V1_TASK_LIST",
    input: {
      query: {
        page: 1,
        limit: 10,
        order: {
          by: "updatedAt",
          dir: "desc",
        },
      },
    },
    debounce: {
      timeout: 500,
    },
  });

  const createM = gateTan.useMutation({
    endpoint: "V1_TASK_CREATE",
    onSuccess: (updatedData) => {
      notifications.show({
        message: updatedData.message,
      });

      router.push(`/app/tasks/${updatedData.task.id}`);
    },
  });

  const updateM = gateTan.useMutation({
    endpoint: "V1_TASK_UPDATE",
    onSuccess: (updatedData) => {
      notifications.show({
        message: updatedData.message,
      });

      query.refetch();
    },
  });

  return (
    <>
      <AppLayout crumbs={taskCrumbs.get()}>
        <Container pt="xl">
          <Stack>
            <Group justify="space-between">
              <Title>Tasks</Title>

              <Group>
                <Button
                  leftSection={<IconPlus size={ICON_SIZE.SM} />}
                  onClick={() => createM.mutate(undefined)}
                  loading={createM.isPending}
                >
                  Create
                </Button>

                <Button
                  px="xs"
                  variant="outline"
                  disabled={query.isFetching}
                  onClick={() => query.refetch()}
                >
                  <IconRefresh size={ICON_SIZE.SM} />
                </Button>
              </Group>
            </Group>

            <SegmentedControl
              data={["Not Completed", "Completed"]}
              value={
                body.query?.filter?.completed ? "Completed" : "Not Completed"
              }
              onChange={(value) => {
                setBody({
                  query: {
                    ...body.query,
                    page: 1,
                    filter:
                      value === "Completed"
                        ? { completed: true }
                        : { completed: false },
                  },
                });
              }}
            />

            <TextInput
              minLength={1}
              maxLength={100}
              placeholder="Search tasks..."
              value={DotProp.lookup(body, "query.filter.value", "")}
              onChange={(e) => {
                const newValue = e.currentTarget.value;

                setBody({
                  query: {
                    ...body.query,
                    page: 1,
                    filter: {
                      ...body.query?.filter,
                      value: newValue || undefined,
                    },
                  },
                });
              }}
            />

            <Divider />

            <LocalQueryLoader
              query={query}
              isLoading={
                <>
                  <Center h="100vh">
                    <Loader />
                  </Center>
                </>
              }
            >
              {({ data, meta }) => (
                <>
                  <Show>
                    <Show.When isTrue={data.length === 0}>
                      <>
                        <Center h="50vh">
                          <Text fs="italic" fw="bold">
                            {(() => {
                              const filterValue = DotProp.lookup(
                                body,
                                "query.filter.value",
                                "",
                              );

                              if (filterValue !== "") {
                                return `No tasks found for "${filterValue}"`;
                              } else {
                                return `"No tasks found."`;
                              }
                            })()}
                          </Text>
                        </Center>
                      </>
                    </Show.When>

                    <Show.Else>
                      <>
                        <For each={data}>
                          {(task) => (
                            <>
                              <Paper p="md" withBorder bg="gray.1">
                                <Stack gap={0}>
                                  <Group justify="space-between">
                                    <Title
                                      order={4}
                                      flex={1}
                                      onClick={() =>
                                        router.push(`/app/tasks/${task.id}`)
                                      }
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Text inherit truncate="end" maw="60%">
                                        {task.title}
                                      </Text>
                                    </Title>

                                    <Group>
                                      {" "}
                                      <ActionIcon
                                        variant="transparent"
                                        size="sm"
                                        onClick={() => {
                                          updateM.mutate({
                                            params: {
                                              taskId: task.id,
                                            },
                                            important: !task.important,
                                          });
                                        }}
                                      >
                                        {task.important ? (
                                          <IconStarFilled fill="var(--mantine-color-yellow-5)" />
                                        ) : (
                                          <IconStar />
                                        )}
                                      </ActionIcon>
                                      <Checkbox
                                        checked={!!task.completedAt}
                                        onChange={(event) => {
                                          updateM.mutate({
                                            params: {
                                              taskId: task.id,
                                            },
                                            completed: event.target.checked,
                                          });
                                        }}
                                      />
                                    </Group>
                                  </Group>
                                </Stack>
                              </Paper>
                            </>
                          )}
                        </For>

                        <Group justify="space-between">
                          <PaginationRange
                            page={DotProp.lookup(body, "query.page", 1)}
                            limit={DotProp.lookup(body, "query.limit", 10)}
                            total={meta.total}
                          />

                          <SimplePagination
                            page={DotProp.lookup(body, "query.page", 1)}
                            limit={DotProp.lookup(body, "query.limit", 10)}
                            total={meta.total}
                            onChange={(page) => {
                              setBody(
                                DotProp.assignOrOmit(
                                  body,
                                  "query.page",
                                  page,
                                  1,
                                ),
                              );
                            }}
                          />
                        </Group>

                        <Space h="xl" />
                      </>
                    </Show.Else>
                  </Show>
                </>
              )}
            </LocalQueryLoader>
          </Stack>
        </Container>
      </AppLayout>
    </>
  );
}
