import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // Vérifier la taille (32MB max)
    if (file.size > 32 * 1024 * 1024) {
      return Response.json({ error: "Le fichier ne doit pas dépasser 32MB" }, { status: 400 });
    }

    // Upload vers UploadThing
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      // ...
      return Response.json({ error: response.error.message }, { status: 500 });
    }

    return Response.json({
      url: response.data.url,
      key: response.data.key,
      name: response.data.name,
    });
  } catch (error) {
    // ...
    return Response.json(
      { error: error.message || "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
