import { Divider, Typography, Stack, Chip } from "@mui/material";

function PrognoseCard() {
  return (
    <Stack spacing={2}>
      <Typography>Risiko for stenging på grunn av vær</Typography>

      <Typography variant="subtitle1">Neste 24 Timene</Typography>
      <Stack direction={"row"} spacing={7}>
        <Typography>0-6 timer:</Typography>
        <Chip label={"Høy (73%)"} sx={{ backgroundColor: "#f25757" }} />
      </Stack>
      <Stack direction={"row"} spacing={6}>
        <Typography>6-12 timer:</Typography>
        <Chip label={"Middels (45%)"} sx={{ backgroundColor: "#f7b945" }} />
      </Stack>
      <Stack direction={"row"} spacing={5}>
        <Typography>12-24 timer:</Typography>
        <Chip label={"Lav (22%)"} sx={{ backgroundColor: "#2fd460" }} />
      </Stack>

      <Divider sx={{ marginTop: 2, opacity: 0.8 }} />

      <Typography variant="subtitle1">Neste 6 dager</Typography>
      <Stack direction={"row"} spacing={9}>
        <Typography>Tirsdag:</Typography>
        <Chip label={"Høy (73%)"} sx={{ backgroundColor: "#f5abab" }} />
      </Stack>
      <Stack direction={"row"} spacing={9}>
        <Typography>Onsdag:</Typography>
        <Chip label={"Lav (22%)"} sx={{ backgroundColor: "#a2f1c4" }} />
      </Stack>
      <Stack direction={"row"} spacing={9}>
        <Typography>Torsdag:</Typography>
        <Chip label={"Middels (45%)"} sx={{ backgroundColor: "#fce5bb" }} />
      </Stack>
      <Stack direction={"row"} spacing={10}>
        <Typography>Fredag:</Typography>
        <Chip label={"Middels (45%)"} sx={{ backgroundColor: "#fce5bb" }} />
      </Stack>
      <Stack direction={"row"} spacing={10}>
        <Typography>Lørdag:</Typography>
        <Chip label={"Middels (45%)"} sx={{ backgroundColor: "#fce5bb" }} />
      </Stack>
      <Stack direction={"row"} spacing={9}>
        <Typography>Søndag:</Typography>
        <Chip label={"Middels (45%)"} sx={{ backgroundColor: "#fce5bb" }} />
      </Stack>
    </Stack>
  );
}

export default PrognoseCard;
